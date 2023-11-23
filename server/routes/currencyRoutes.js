const express = require("express");
const router = express.Router();
const {
  getCurrencyNames,
  getPricesByDuration,
  getPricesWeekly,
  getPricesMonthly,
  getPricesQuaterly,
  getPricesYearly,
} = require("../controllers/currencyControllers");

router.get("/currencyNames", getCurrencyNames);
router.get("/duration", getPricesByDuration);
router.get("/weekly", getPricesWeekly);
router.get("/monthly", getPricesMonthly);
router.get("/quarterly", getPricesQuaterly);
router.get("/yearly", getPricesYearly);

module.exports = router;
