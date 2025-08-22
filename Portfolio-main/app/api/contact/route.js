import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window

// Input validation and sanitization
const validateAndSanitizeInput = (data) => {
  const { name, email, subject, message, recaptchaToken } = data;

  // Required field validation
  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required fields.");
  }

  if (!recaptchaToken) {
    throw new Error("reCAPTCHA verification is required.");
  }

  // Length validation
  if (name.length > 100) {
    throw new Error("Name must be less than 100 characters.");
  }

  if (subject && subject.length > 200) {
    throw new Error("Subject must be less than 200 characters.");
  }

  if (message.length > 5000) {
    throw new Error("Message must be less than 5000 characters.");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please provide a valid email address.");
  }

  // Basic content sanitization (remove potential HTML/script tags)
  const sanitize = (str) => {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .trim();
  };

  return {
    name: sanitize(name),
    email: sanitize(email),
    subject: subject ? sanitize(subject) : "",
    message: sanitize(message),
    recaptchaToken,
  };
};

// Rate limiting check
const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];

  // Remove old requests outside the window
  const validRequests = userRequests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestRequest = Math.min(...validRequests);
    const resetTime = Math.ceil(
      (oldestRequest + RATE_LIMIT_WINDOW - now) / 1000
    );
    throw new Error(
      `Too many requests. Please try again in ${resetTime} seconds.`
    );
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
};

// Verify reCAPTCHA token
const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("reCAPTCHA secret key not configured.");
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      throw new Error("reCAPTCHA verification failed. Please try again.");
    }

    // For reCAPTCHA v3, check score (optional)
    if (data.score !== undefined && data.score < 0.5) {
      throw new Error("reCAPTCHA score too low. Please try again.");
    }

    return data;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    throw new Error("reCAPTCHA verification failed. Please try again.");
  }
};

// GET method handler (for testing)
export async function GET() {
  return NextResponse.json(
    {
      message: "Contact API is working",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

// POST method handler
export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting
    checkRateLimit(ip);

    // Parse request body
    const body = await request.json();

    // Validate and sanitize input
    const sanitizedData = validateAndSanitizeInput(body);

    // Verify reCAPTCHA
    await verifyRecaptcha(sanitizedData.recaptchaToken);

    // Remove recaptcha token from data before sending email
    const { recaptchaToken, ...emailData } = sanitizedData;

    // Send email
    const emailResult = await sendContactEmail(emailData);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        data: {
          notificationId: emailResult.notificationId,
          autoReplyId: emailResult.autoReplyId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Determine appropriate status code
    let statusCode = 500;
    if (
      error.message.includes("required fields") ||
      error.message.includes("valid email") ||
      error.message.includes("characters")
    ) {
      statusCode = 400; // Bad Request
    } else if (error.message.includes("Too many requests")) {
      statusCode = 429; // Too Many Requests
    } else if (error.message.includes("reCAPTCHA")) {
      statusCode = 422; // Unprocessable Entity
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "An error occurred while sending your message.",
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}

// Handle other HTTP methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
