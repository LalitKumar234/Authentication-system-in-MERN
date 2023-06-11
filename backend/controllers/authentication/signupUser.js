
const AuthService = require('../../services/auth.service')
const AuthServiceInstance = new AuthService()

const signupUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try{
    const newUser = await AuthServiceInstance.signup(firstname, lastname, email, password)
    res.json(newUser)
  }  
  catch (err) {
      console.log(err.message);
      res.status(500).send("Error in creating account");
    }
};
module.exports = signupUser;
