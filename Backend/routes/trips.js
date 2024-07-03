var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const { checkBody } = require("../modules/checkBody")

router.post('/', async function (req, res, next) {
  if (checkBody(req.body, ["departure", "arrival", "date"])) {

    let date = new Date(req.body.date)
    let findTrip = await Trip.find({ departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i') } })

    let filteredTrips = findTrip.filter(e => e.date > date && e.date < new Date(new Date(req.body.date).setDate(new Date(req.body.date).getDate() + 1)))
    // fais un tableau de tous les departure et arrival, et ensuite tu filter() le tableau avec la date

    res.json({ trips: filteredTrips })
  } else {
    res.json({ result: false, error: 'Missing field' })
  }

});



module.exports = router;