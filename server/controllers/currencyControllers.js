const expressAsyncHandler = require("express-async-handler");
const Currency = require("../models/currencyModels");
const csv = require("csvtojson");

//@desc upload Exchange rates CSV
//@route POST /uploadCSV
//@access public
const getCurrencyNames = expressAsyncHandler(async (req, res) => {
  const response = await Currency.find({}, { _id: 0, currency_name: 1 });
  res.status(200).json(response);
});

//@desc upload Exchange rates CSV
//@route POST /uploadCSV
//@access public
const uploadCSV = expressAsyncHandler(async (req, res) => {
  let currencyData = [];
  await csv()
    .fromFile(req.file.path)
    .then((response) => {
      for (let x = 0; x < response.length; x++) {
        let data = [];
        let date = Object.keys(response[x]);
        let conversion_rate = Object.values(response[x]);
        for (let y = 1; y < date.length; y++) {
          data.push({
            date: date[y],
            conversion_rate: conversion_rate[y],
          });
        }
        currencyData.push({
          currency_name: response[x].Date,
          data: data,
        });
      }
    });
  console.log(currencyData);
  await Currency.insertMany(currencyData);
  res.status(200).json({ message: "Uploaded CSV Successfully" });
});

//@desc GET Prices of Currency By Duration
//@route GET /api/currency/duration
//@access public
const getPricesByDuration = expressAsyncHandler(async (req, res) => {
  const currency_name = req.query.currency_name;
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;

  const data = await Currency.aggregate([
    {
      $unwind: "$data",
    },
    {
      $match: {
        currency_name: currency_name,
        "data.date": {
          $gte: new Date(start_date),
          $lte: new Date(end_date),
        },
      },
    },
    {
      $project: {
        _id: 0,
        currency_name: "$currency_name",
        date: "$data.date",
        conversion_rate: "$data.conversion_rate",
      },
    },
  ]);

  const x_coordinates = [];
  const y_coordinates = [];
  let min_value = { date: "", conversion_rate: Infinity };
  let max_value = { date: "", conversion_rate: -Infinity };

  for (let i = 0; i < data.length; i++) {
    let date = data[i].date.toISOString().substring(0, 10);
    let conversion_rate = data[i].conversion_rate;

    x_coordinates.push(date);
    y_coordinates.push(conversion_rate);

    if (conversion_rate < min_value.conversion_rate) {
      min_value = {
        date,
        conversion_rate,
      };
    }
    if (conversion_rate > max_value.conversion_rate) {
      max_value = {
        date,
        conversion_rate,
      };
    }
    console.log(max_value, min_value);
  }

  const response = {
    x_coordinates: x_coordinates,
    y_coordinates: y_coordinates,
    min: min_value,
    max: max_value,
  };

  console.log(response);

  res.status(200).json(response);
});

//@desc GET Prices Weekly
//@route GET /api/currency/weekly
//@access public
const getPricesWeekly = expressAsyncHandler(async (req, res) => {
  const currency_name = req.query.currency_name;

  const data = await Currency.aggregate([
    {
      $match: {
        currency_name: currency_name,
      },
    },
    {
      $unwind: "$data",
    },
    {
      $project: {
        currency_name: 1,
        date: "$data.date",
        conversion_rate: "$data.conversion_rate",
        week: { $isoWeek: "$data.date" },
        year: { $isoWeekYear: "$data.date" },
      },
    },
    {
      $group: {
        _id: { currency_name: "$currency_name", year: "$year", week: "$week" },
        averageRate: { $avg: "$conversion_rate" },
      },
    },
    {
      $project: {
        _id: 0,
        currency_name: "$_id.currency_name",
        year: "$_id.year",
        week: "$_id.week",
        averageRate: 1,
      },
    },
    {
      $sort: { year: 1, week: 1 },
    },
  ]);

  const x_coordinates = [];
  const y_coordinates = [];

  for (let i = 0; i < data.length; i++) {
    let week = data[i].week;
    let conversion_rate = data[i].averageRate;

    x_coordinates.push(week);
    y_coordinates.push(conversion_rate);
  }

  const response = {
    x_coordinates: x_coordinates,
    y_coordinates: y_coordinates,
  };

  console.log(response);

  res.status(200).json(response);
});

//@desc GET Prices Monthly
//@route GET /api/currency/monthly
//@access public
const getPricesMonthly = expressAsyncHandler(async (req, res) => {
  const currency_name = req.query.currency_name;

  const data = await Currency.aggregate([
    {
      $match: {
        currency_name: currency_name,
      },
    },
    {
      $unwind: "$data",
    },
    {
      $project: {
        currency_name: 1,
        date: "$data.date",
        conversion_rate: "$data.conversion_rate",
        month: { $month: "$data.date" },
        year: { $year: "$data.date" },
      },
    },
    {
      $group: {
        _id: {
          currency_name: "$currency_name",
          year: "$year",
          month: "$month",
        },
        averageRate: { $avg: "$conversion_rate" },
      },
    },
    {
      $project: {
        _id: 0,
        currency_name: "$_id.currency_name",
        year: "$_id.year",
        month: "$_id.month",
        averageRate: 1,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);

  const x_coordinates = [];
  const y_coordinates = [];

  for (let i = 0; i < data.length; i++) {
    let month = data[i].month;
    let conversion_rate = data[i].averageRate;

    x_coordinates.push(month);
    y_coordinates.push(conversion_rate);
  }

  const response = {
    x_coordinates: x_coordinates,
    y_coordinates: y_coordinates,
  };

  console.log(response);

  res.status(200).json(response);
});

//@desc GET Prices Quaterly
//@route GET /api/currency/quaterly
//@access public
const getPricesQuaterly = expressAsyncHandler(async (req, res) => {
  const currency_name = req.query.currency_name;

  const data = await Currency.aggregate([
    {
      $match: {
        currency_name: currency_name,
      },
    },
    {
      $unwind: "$data",
    },
    {
      $project: {
        currency_name: 1,
        date: "$data.date",
        conversion_rate: "$data.conversion_rate",
        quarter: {
          $ceil: {
            $divide: [{ $subtract: [{ $month: "$data.date" }, 1] }, 4],
          },
        },
        year: { $year: "$data.date" },
      },
    },
    {
      $group: {
        _id: {
          currency_name: "$currency_name",
          year: "$year",
          quarter: "$quarter",
        },
        averageRate: { $avg: "$conversion_rate" },
      },
    },
    {
      $project: {
        _id: 0,
        currency_name: "$_id.currency_name",
        year: "$_id.year",
        quarter: "$_id.quarter",
        averageRate: 1,
      },
    },
    {
      $sort: { year: 1, quarter: 1 },
    },
  ]);

  const x_coordinates = [];
  const y_coordinates = [];

  for (let i = 0; i < data.length; i++) {
    let quarter = data[i].quarter;
    let conversion_rate = data[i].averageRate;

    x_coordinates.push(quarter);
    y_coordinates.push(conversion_rate);
  }

  const response = {
    x_coordinates: x_coordinates,
    y_coordinates: y_coordinates,
  };

  console.log(response);

  res.status(200).json(response);
});

//@desc GET Prices Yearly
//@route GET /api/currency/yearly
//@access public
const getPricesYearly = expressAsyncHandler(async (req, res) => {
  const currency_name = req.query.currency_name;

  const data = await Currency.aggregate([
    {
      $match: {
        currency_name: currency_name,
      },
    },
    {
      $unwind: "$data",
    },
    {
      $project: {
        currency_name: 1,
        date: "$data.date",
        conversion_rate: "$data.conversion_rate",
        year: { $year: "$data.date" },
      },
    },
    {
      $group: {
        _id: { currency_name: "$currency_name", year: "$year" },
        averageRate: { $avg: "$conversion_rate" },
      },
    },
    {
      $project: {
        _id: 0,
        currency_name: "$_id.currency_name",
        year: "$_id.year",
        averageRate: 1,
      },
    },
    {
      $sort: { year: 1 },
    },
  ]);

  const x_coordinates = [];
  const y_coordinates = [];

  for (let i = 0; i < data.length; i++) {
    let year = data[i].year;
    let conversion_rate = data[i].averageRate;

    x_coordinates.push(year);
    y_coordinates.push(conversion_rate);
  }

  const response = {
    x_coordinates: x_coordinates,
    y_coordinates: y_coordinates,
  };

  console.log(response);

  res.status(200).json(response);
});

module.exports = {
  getCurrencyNames,
  getPricesByDuration,
  getPricesWeekly,
  getPricesMonthly,
  getPricesQuaterly,
  getPricesYearly,
  uploadCSV,
};
