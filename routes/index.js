const express = require("express");
const router = express.Router();
const Link = require("../models/link");

const generateCode = () => {
  var text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/:code/stats", async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);
  res.render("stats", resultado.dataValues);
});

router.get("/:code", async (req, res, next) => {
  const code = req.params.code;

  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);

  resultado.hits++;
  await resultado.save();

  res.redirect(resultado.url);
});

// Pagina inicial
router.get("/", function (req, res, next) {
  res.render("index");
});



router.post("/new", async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const result = await Link.create({
    url,
    code,
  });
  res.redirect(`/${result.code}/stats`);
});

module.exports = router;
