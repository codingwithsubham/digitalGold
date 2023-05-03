const Vault = require("../models/vault");

const addBalance = async (user, val, remarks) => {
  const date = new Date();
  try {
    let vault = await Vault.findOne({ user: user });
    if (!vault) {
      const newVault = new Vault({
        vaultBalance: parseFloat(val),
        user: user,
        passbook: [
          {
            value: parseFloat(val),
            type: "CREDIT",
            date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
            remarks: remarks,
          },
        ],
      });
      await newVault.save();
      return newVault;
    } else {
      vault.vaultBalance = parseFloat(vault.vaultBalance) + parseFloat(val);
      vault.passbook.push({
        value: parseFloat(val),
        type: "CREDIT",
        date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        remarks: remarks,
      });
      await vault.save();
      return vault;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const debitBalance = async (user, val, remarks) => {
  const date = new Date();
  try {
    let vault = await Vault.findOne({ user: user });
    vault.vaultBalance = parseFloat(vault.vaultBalance) - parseFloat(val);
    vault.passbook.push({
      value: parseFloat(val),
      type: "DEBIT",
      date: date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      remarks: remarks,
    });
    await vault.save();
    return vault;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { addBalance, debitBalance };
