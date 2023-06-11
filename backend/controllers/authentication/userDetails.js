const User = require("../../models/userModel");

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userDetails