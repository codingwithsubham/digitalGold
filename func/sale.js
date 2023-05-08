const Returns = require("../models/returns");
const Sale = require("../models/sale");

const addSale = async (user, val, price) => {
  const date = new Date();
  try {
    const sale = new Sale({
        value: parseFloat(val),
        price: parseFloat(price),
        user: user,
        date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    });
    await sale.save();
    return sale;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addReturns = async (user, val, price) => {
  const date = new Date();
  try {
    const returns = new Returns({
        value: parseFloat(val),
        price: parseFloat(price),
        status: "processing",
        user: user,
        date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    });
    await returns.save();
    return returns;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { addSale, addReturns };
