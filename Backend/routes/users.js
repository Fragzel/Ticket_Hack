var express = require('express');
var router = express.Router();
const User = require("../models/users")

/* GET users listing. */
router.post('/', async function (req, res, next) {
  console.log(req.body.idVoyage)
  User.updateOne({ name: "Mimolette" }, { $push: { idVoyage: req.body.idVoyage } })
    .then(
      res.json({ result: true })
    )
});

router.get('/', async function (req, res) {
  let classicUserFound = await User.findOne({ name: "Mimolette" })
  let populate = await classicUserFound.populate('idVoyage')
  let popu = await classicUserFound.populate('idPurchase')
  let userFound = res.json({ user: classicUserFound })


})

router.delete("/:id", (req, res) => {
  console.log(req.params.id)
  User.updateOne({}, { $pull: { idVoyage: req.params.id } })
    .then(() => {
      res.json({ result: true });
    });
});

router.post('/purchase', async function (req, res, next) {
  console.log(req.body.idPurchase)
  User.updateOne({ name: "Mimolette" }, { $push: { idPurchase: req.body.idPurchase } })
    .then(
      res.json({ result: true })
    )
});

router.post('/', async function (req, res, next) {
  console.log(req.body.idPurshase)
  User.updateOne({ name: "Mimolette" }, { $push: { idPurchase: req.body.idPurchase } })
    .then(
      res.json({ result: true })
    )
});



module.exports = router;
