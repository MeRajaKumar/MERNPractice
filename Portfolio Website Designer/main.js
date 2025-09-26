const accordionItems = document.querySelectorAll(".accordion-item");
const imageElement = document.querySelector(".image img");

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelector(".accordion-item.active")
      ?.classList.remove("active");

    item.classList.add("active");
    const imagePath = item.dataset.image;
    imageElement.classList.add("fade-out");

    setTimeout(() => {
      imageElement.src = imagePath;
      imageElement.classList.remove("fade-out");
    }, 300);
  });
});

const testimonialsContainer = document.querySelector(".testimonials-container");
const nextBtn = document.querySelector(".nav-arrow.next");
const prevBtn = document.querySelector(".nav-arrow.prev");
const testimonials = document.querySelectorAll(".testimonial-content");

let currentIndex = 0;
const totalTestimonials = testimonials.length;

const updateSlider = () => {
  testimonialsContainer.style.transform = `translateX(-${
    (currentIndex * 100) / totalTestimonials
  }%)`;
};

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalTestimonials;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
  updateSlider();
});

// Mobile nav menu

const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
const mobileNavMenus = document.querySelector(".mobile-nav-menus");

menuIcon.addEventListener("click", () => {
  mobileNavMenus.classList.add("active");
});

closeIcon.addEventListener("click", () => {
  mobileNavMenus.classList.remove("active");
});

// Animations

const heroTimeline = gsap.timeline();

heroTimeline
  .to("nav .logo", { opacity: 1, y: 0, duration: 0.8 })
  .to(
    "nav .menu-items a",
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1,0.8)",
      stagger: 0.16,
    },
    "-=0.9"
  )
  .to(
    ".hero h1",
    {
      opacity: 1,
      y: 0,
      duration: 1.8,
    },
    "-=1.8"
  )
  .to(
    ".socials a",
    {
      opacity: 1,
      scale: 1,
      ease: "elastic.out(1,0.3)",
      duration: 1.6,
      stagger: 0.16,
    },
    "-=1"
  )
  .to(
    ".hero .sub-heading",
    {
      opacity: 1,
      y: 0,
      duration: 1.6,
    },
    "-=2.3"
  )
  .to(
    ".hero .btn",
    {
      opacity: 1,
      scale: 1,
      ease: "elastic.out(1,0.3)",
      duration: 0.1,
    },
    "-=2"
  )
  .to(
    ".hero-image-container",
    {
      opacity: 1,
      x: 0,
      duration: 1.6,
    },
    "-=3.0"
  )
  .to(
    ".achievements",
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
    },
    "-=2.8"
  )
  .to(
    ".achievement",
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.16,
    },
    "-=2"
  );

gsap.fromTo(
  "#about .left",
  { x: -40, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#about .left",
      start: "top 80%",
      end: "top 10%",
      scrub: true,
    },
  }
);

gsap.fromTo(
  "#about .description",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 2,
    scrollTrigger: {
      trigger: "#about .description",
      start: "top 80%",
    },
  }
);

const heading2 = gsap.utils.toArray("h2");

heading2.forEach((h2) => {
  gsap.fromTo(
    h2,
    { opacity: 0, x: -40 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: h2,
        start: "top 80%",
      },
    }
  );
});

gsap.fromTo(
  "#services .image",
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "elastic.out(1, 0.3)",
    scrollTrigger: { trigger: "#services .image", start: "top 80%" },
  }
);

gsap.fromTo(
  ".accordion-item",
  { opacity: 0, x: -40 },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    stagger: 0.16,
    scrollTrigger: { trigger: ".accordion-item", start: "top 80%" },
  }
);

gsap.fromTo(
  ".brand-logos img",
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    duration: 2,
    stagger: 0.16,
    ease: "elastic.out(1, 0.3)",
    scrollTrigger: { trigger: ".brand-logos img", start: "top 80%" },
  }
);

gsap.fromTo(
  ".project",
  { opacity: 0, scale: 0.97 },
  {
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "elastic.out(1, 0.3)",
    stagger: 0.16,
    scrollTrigger: {
      trigger: ".project",
      start: "top 80%",
    },
  }
);

gsap.fromTo(
  ".timeline-item",
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    duration: 2,
    stagger: 0.16,
    ease: "elastic.out(1,0.3)",
    scrollTrigger: {
      trigger: ".timeline-item",
      start: "top 80%",
    },
  }
);

const buttons = gsap.utils.toArray("section .btn");

buttons.forEach((btn) => {
  gsap.fromTo(
    btn,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      scrollTrigger: { trigger: btn, start: "top 80%" },
    }
  );
});

const paragraph = gsap.utils.toArray("section p:not(.accordion-content)");

paragraph.forEach((p) => {
  gsap.fromTo(
    p,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      scrollTrigger: { trigger: p, start: "top 80%" },
    }
  );
});
