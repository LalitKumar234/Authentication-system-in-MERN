const AuthService = require('../../services/auth.service')
const AuthServiceInstance = new AuthService()

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
      const newUser = await AuthServiceInstance.login(email, password)
      res.json(newUser)
    }  
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Logging in");
      }
  };
  
  module.exports = loginUser; 
  