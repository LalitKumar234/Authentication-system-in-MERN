const User = require("../../models/userModel");
const AuthService = require('../../services/auth.service')
const AuthServiceInstance = new AuthService()

const updateUserDetails = async (req, res) => {

    try {
        const updateUser = await AuthServiceInstance.update(req.body, req.params.id)
        res.json(updateUser)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in updating account");
    }

}
module.exports = updateUserDetails