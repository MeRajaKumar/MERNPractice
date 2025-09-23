const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { ensureAuth, attachUserToLocals } = require('./middleware/authMiddleware');

const path = require("path");
const methodOverride = require("method-override");   // ✅ FIX
const morgan = require("morgan");                   // ✅ FIX
const session = require("express-session");         // ✅ FIX
const MongoStore = require("connect-mongo");        // ✅ FIX

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
  })
);

// Attach user (if any) to res.locals for views
app.use(attachUserToLocals);

// Routes
app.use('/', authRoutes);
app.use('/employees', ensureAuth, employeeRoutes);

// Dashboard
app.get('/dashboard', ensureAuth, async (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return res.render('dashboard/admin');
  }
  return res.render('dashboard/employee');
});

// Home
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.redirect('/login');
});

// 404
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
