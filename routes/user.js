const express = require("express");
const router = express.Router();
const passport = require("passport");
var middleware = require("../modules/middleware");

router.get("/signup", (req, res) => {
    if (req.user) res.redirect("/");
    res.render("signup");
});

router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
}));

router.get("/login", (req, res) => {
    if (req.user) res.redirect("/");
    res.render("login");
});

router.get("/logout", middleware.isLogged, (req, res) => {
    req.logout();
    res.redirect("/");
})

router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

router.get("/profile", middleware.isLogged, (req, res) => {
    res.render("profile", {
        user: req.user
    });
})

module.exports = router;