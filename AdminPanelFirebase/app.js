// // =========================================================
// // 1. FIREBASE CONFIGURATION (Final and Corrected)
// // =========================================================
// const firebaseConfig = {
//     // Project ID (admin-panel-webpage) aur API Key aapki image se confirmed hai.
//     apiKey: "AIzaSyBgPROPCYviNlTUK9yPijBpCfBnLsc-kFw", 
//     authDomain: "admin-panel-webpage.firebaseapp.com",
//     projectId: "admin-panel-webpage", 
//     storageBucket: "admin-panel-webpage.appspot.com",
//     messagingSenderId: "38480248834",
//     appId: "1:38480248834:web:df49440175357e551aa71b",
//     measurementId: "G-5QKD7JS0SR" 
// };

// // Initialize Firebase (v8 syntax)
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();


// // =========================================================
// // 2. Element Selectors & Global Variables
// // (Saare selectors index.html, admin/, aur student/ files ke liye)
// // =========================================================

// // --- Global Variables (UID Counter) ---
// let nextStudentNum = 1; 
// let nextTeacherNum = 2; 

// // --- Selectors for index.html ---
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const loginBtn = document.getElementById('login-btn');
// const errorMessage = document.getElementById('error-message');

// const studentSignupBtn = document.getElementById('student-signup-btn');
// const studentSignupMessage = document.getElementById('student-signup-message');
// const signupEmailInput = document.getElementById('signup-email');
// const signupPasswordInput = document.getElementById('signup-password');
// const signupNameInput = document.getElementById('signup-name');
// const signupDobInput = document.getElementById('signup-dob');
// const signupMobileInput = document.getElementById('signup-mobile');

// const adminSignupBtn = document.getElementById('admin-signup-btn');
// const adminSignupMessage = document.getElementById('admin-signup-message');
// const adminSignupEmailInput = document.getElementById('admin-signup-email');
// const adminSignupPasswordInput = document.getElementById('admin-signup-password');
// const adminSignupNameInput = document.getElementById('admin-signup-name');
// const adminSignupMobileInput = document.getElementById('admin-signup-mobile');
// const adminSignupSubjectInput = document.getElementById('admin-signup-subject');

// // --- Selectors for Dashboards ---
// const logoutBtn = document.getElementById('logout-btn');
// const studentLogoutBtn = document.getElementById('student-logout-btn');
// const userEmailSpan = document.getElementById('user-email');
// const dataDisplay = document.getElementById('data-display');
// const studentUIDDisplay = document.getElementById('student-uid-display');
// const studentMarksDiv = document.getElementById('student-marks');
// const studentAttendanceDiv = document.getElementById('student-attendance');
// const studentScheduleDiv = document.getElementById('student-schedule');
// const studentNameDisplay = document.getElementById('student-name-display');
// const studentEmailDisplay = document.getElementById('student-email-display');
// const studentCourseDisplay = document.getElementById('student-course-display');


// // =========================================================
// // 3. Helper Functions (UID Generation and Role Check)
// // =========================================================

// function generateUniqueID(prefix) {
//     if (prefix === 'STD') {
//         const num = String(nextStudentNum++).padStart(3, '0');
//         return `STD${num}`;
//     }
//     if (prefix === 'TE') {
//         const num = String(nextTeacherNum++).padStart(2, '0');
//         return `TE${num}`;
//     }
//     return 'UID-ERR';
// }

// async function getUserRole(uid) {
//     const teacherDoc = await db.collection("teachers").doc(uid).get();
//     if (teacherDoc.exists) return 'teacher';
    
//     const studentDoc = await db.collection("students").doc(uid).get();
//     if (studentDoc.exists) return 'student';

//     return 'unknown';
// }

// // Data Fetching functions (Logic is simplified for this final code block)
// function fetchAdminData() { 
//     if(dataDisplay) dataDisplay.innerHTML = "Admin Data Fetching is running...";
//     // Yahan students list load karne ka pura logic aayega
// }
// function fetchStudentData(uid) { 
//     if(studentUIDDisplay) studentUIDDisplay.textContent = `UID: ${uid} (Fetching profile...)`;
//     // Yahan single student profile load karne ka pura logic aayega
// }


// // =========================================================
// // 4. AUTHENTICATION LOGIC & HANDLERS (FULL REGISTRATION LOGIC)
// // =========================================================

// // --- Universal Logout Handler ---
// const handleLogout = () => auth.signOut();
// if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
// if (studentLogoutBtn) studentLogoutBtn.addEventListener('click', handleLogout);


// // --- Login Handler ---
// if (loginBtn) {
//     loginBtn.addEventListener('click', () => {
//         const email = emailInput.value;
//         const password = passwordInput.value;
//         if (errorMessage) errorMessage.textContent = '';

//         auth.signInWithEmailAndPassword(email, password)
//             .then(() => {
//                 if (window.closeForm) window.closeForm(); 
//             })
//             .catch((error) => {
//                 if (errorMessage) errorMessage.textContent = `Login Failed: ${error.message}`;
//             });
//     });
// }

// // --- Student Registration Handler ---
// if (studentSignupBtn) {
//     studentSignupBtn.addEventListener('click', async () => {
//         const email = signupEmailInput.value;
//         const password = signupPasswordInput.value;
//         const fullName = signupNameInput.value;
//         const dob = signupDobInput.value;
//         const mobile = signupMobileInput.value;
//         const msg = studentSignupMessage;

//         // Validation Check
//         if (!email || !password || !fullName || !mobile) { msg.textContent = "Error: All fields are required."; msg.style.color = 'red'; return; }
//         if (password.length < 6) { msg.textContent = "Password must be at least 6 characters long."; msg.style.color = 'red'; return; }

//         try {
//             msg.textContent = "Creating account..."; msg.style.color = 'orange';
//             const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//             const userId = userCredential.user.uid;
//             const uniqueID = generateUniqueID('STD');
            
//             // Firestore data save
//             await db.collection("students").doc(userId).set({
//                 uid: userId, studentId: uniqueID, fullName: fullName, dob: dob, mobile: mobile,
//                 email: email, role: 'student', registeredAt: firebase.firestore.FieldValue.serverTimestamp()
//             });

//             msg.textContent = `Success! Your ID is ${uniqueID}. Please login now.`; msg.style.color = 'green';
//         } catch (error) {
//             msg.textContent = `Registration Failed: ${error.message}`; msg.style.color = 'red';
//         }
//     });
// }

// // --- Teacher Registration Handler ---
// if (adminSignupBtn) {
//     adminSignupBtn.addEventListener('click', async () => {
//         const email = adminSignupEmailInput.value;
//         const password = adminSignupPasswordInput.value;
//         const fullName = adminSignupNameInput.value;
//         const mobile = adminSignupMobileInput.value;
//         const subject = adminSignupSubjectInput.value;
//         const msg = adminSignupMessage;

//         // Validation Check
//         if (!email || !password || !fullName || !subject || !mobile) { msg.textContent = "Error: All fields are required."; msg.style.color = 'red'; return; }

//         try {
//             msg.textContent = "Creating Teacher Account..."; msg.style.color = 'orange';
//             const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//             const userId = userCredential.user.uid;
//             const uniqueID = generateUniqueID('TE');
            
//             // Firestore data save
//             await db.collection("teachers").doc(userId).set({ 
//                 uid: userId, teacherId: uniqueID, fullName: fullName, mobile: mobile,
//                 subject: subject, email: email, role: 'teacher', registeredAt: firebase.firestore.FieldValue.serverTimestamp()
//             });
            
//             msg.textContent = `Success! Teacher ID ${uniqueID} created. Login now.`; msg.style.color = 'green';
//         } catch (error) {
//             msg.textContent = `Registration Failed: ${error.message}`; msg.style.color = 'red';
//         }
//     });
// }


// // =========================================================
// // 5. ROLE-BASED REDIRECTION
// // =========================================================
// const ADMIN_EMAIL = "admin@youruniversity.com"; // Fallback for initial setup

// auth.onAuthStateChanged(async user => {
//     const currentPath = window.location.pathname;

//     // --- 1. User LOGGED OUT ---
//     if (!user) {
//         if (!currentPath.includes('index.html')) {
//             window.location.href = 'index.html';
//         }
//         return; 
//     }

//     // --- 2. User LOGGED IN ---
    
//     const userRole = await getUserRole(user.uid);
    
//     if (userRole === 'teacher' || user.email === ADMIN_EMAIL) {
//         // ADMIN/TEACHER Logic
//         if (!currentPath.includes('/admin/')) {
//             window.location.href = 'admin/dashboard.html';
//         } else if (currentPath.includes('/admin/')) {
//             fetchAdminData();
//             if(userEmailSpan) userEmailSpan.textContent = user.email;
//         }
        
//     } else if (userRole === 'student') {
//         // STUDENT Logic
//         if (!currentPath.includes('/student/')) {
//             window.location.href = 'student/dashboard.html';
//         } else if (currentPath.includes('/student/')) {
//             fetchStudentData(user.uid);
//         }
//     } else {
//         // Unknown role (Data missing in Firestore)
//         if (!currentPath.includes('index.html')) {
//             alert("Your profile data is incomplete. Logging out.");
//             auth.signOut();
//         }
//     }
// });