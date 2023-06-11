require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

class AuthService {
    signup = async (firstname, lastname, email, password) => {
        let user = await User.findOne({ email });
        if (user) {
            return { error: "User already exists. Please login." };
        }
        user = new User({
            firstname,
            lastname,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_STRING,
            {
                expiresIn: 10000,
            }
        );
        return { token };
    }
    login = async (email, password) => {
            let user = await User.findOne({ email });
            if (!user) {
              return { error: "User not found please signup" }
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return { error: "Incorrect Password" }
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_STRING,
                {
                    expiresIn: 10000,
                }
            );
            return { token };
    }
    update = async (data, id) => {
        let user = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        if (!user) {
            return { error: "User not found" }
        }
        return { message: "Updated successfully", user }
    }
}

module.exports = AuthService


// const jwt = require('jsonwebtoken');

// const user = { id: 123, username: 'john.doe' };
// const token = jwt.sign(user, 'secret_key');


// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization;
  
//     if (token) {
//       jwt.verify(token, 'secret_key', (err, user) => {
//         if (err) {
//           return res.sendStatus(403); // Invalid token
//         }
  
//         req.user = user;
//         next();
//       });
//     } else {
//       res.sendStatus(401); // Unauthorized
//     }
//   };

  