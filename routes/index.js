var router = require("express").Router();
const request = require("request");

const passport = require("passport");
const User = require("../models/user");
const Farm = require("../models/farm");

const nasaAPI =
  "https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?&request=execute&identifier=SinglePoint&parameters=PRECTOT&startDate=";

today = new Date();
var enddate =
  today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
var last =
  today.getFullYear() -
  1 +
  "" +
  (today.getMonth() + 1) +
  "" +
  (today.getDate() + 1);

/* GET home page. */
router.get("/", function (req, res, next) {
  Farm.find({}, function (err, farms) {
    if (err) return next(err);
    res.render("farms/index", { farms: farms });
  });
});

router.get("/farms/:id", function (req, res, next) {
  Farm.findById(req.params.id).exec(function (err, farm) {
    request(
      `${nasaAPI}${last}&endDate=${enddate}&userCommunity=SSE&tempAverage=DAILY&outputList=JSON&lat=${farm.lat}&lon=${farm.lon}`,
      function (err, response, body) {
        res.render("farms/show", { farm: farm, body });
      }
    );
  });
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

router.post("/farms", isLoggedIn, function create(req, res, next) {
  const farm = new Farm(req.body);
  console.log(req.body);
  farm.user = req.user._id;
  farm.lat = Number(req.body.lat).toFixed(4);
  farm.lon = Number(req.body.lon).toFixed(4);
  farm
    .save()
    .then(console.log(farm))
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.err(err);
      res.redirect("/");
    });
});

router.post("/farms/:id", function update(req, res) {
  Farm.findOne({ _id: req.params.id }, function (err, f) {
    f.farmName = req.body.farmName;
    f.lat = Number(req.body.lat).toFixed(4);
    f.lon = Number(req.body.lon).toFixed(4);
    f.save()
      .then(console.log(f))
      .then(() => res.redirect("/"))
      .catch((err) => {
        console.err(err);
        res.redirect("/");
      });
  });
});

router.get("/farms/delete/:id", function (req, res) {
  console.log(req.params.id);
  Farm.findByIdAndRemove(req.params.id, (err, response) => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log("error");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
