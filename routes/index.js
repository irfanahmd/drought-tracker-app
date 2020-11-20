var router = require("express").Router();

const passport = require("passport");
const User = require("../models/user");
const Farm = require("../models/farm");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/farms", function create(req, res, next) {
  const farm = new Farm(req.body);
  farm.user = req.user._id;
  farm
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.err(err);
      res.redirect("/");
    });
});

module.exports = router;
