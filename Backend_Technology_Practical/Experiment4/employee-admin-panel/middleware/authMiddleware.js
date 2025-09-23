exports.ensureAuth = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/login");
};

exports.attachUserToLocals = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};
