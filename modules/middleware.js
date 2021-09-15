var middleware = {};

middleware.isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

middleware.logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
}

middleware.handleErrors = (err, req, res, next) => {
  res.render("error", {message: err.message});
}

module.exports = middleware;