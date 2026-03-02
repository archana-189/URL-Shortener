const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => res.render("index"));

router.post("/shorten", ensureAuthenticated, async (req, res) => {
  const shortUrl = shortid.generate();
  await Url.create({
    fullUrl: req.body.fullUrl,
    shortUrl,
    userId: req.session.user._id
  });
  res.redirect("/dashboard");
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const urls = await Url.find({ userId: req.session.user._id });
  res.render("dashboard", { urls });
});

router.get("/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (!url) return res.sendStatus(404);
  url.clicks++;
  await url.save();
  res.redirect(url.fullUrl);
});

module.exports = router;

