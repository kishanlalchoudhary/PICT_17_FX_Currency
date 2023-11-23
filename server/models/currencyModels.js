const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  currency_name: {
    type: String,
    required: [true, "Please add the Currency name."],
  },
  data: [
    {
      date: {
        type: Date,
        required: [true, "Please add the date."],
      },
      conversion_rate: {
        type: Number,
        required: [true, "Please add the Currency conversion rate."],
      },
    },
  ],
});

module.exports = mongoose.model("Currency", currencySchema);
