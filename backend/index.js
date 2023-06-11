const express = require('express');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/dbConnection');
const  userRoute  = require('./routes/userRoutes');
const PORT = process.env.PORT || 5500
const cors = require('cors')


const app = express();
app.use(cookieParser());

app.use(cors())

app.use(express.json())
connectDatabase()

app.use("/auth", userRoute)

app.post('/demo', (req, res)=>{
    console.log(req.body, 'hi')
    res.send(req.body)
})



app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));


// const nodemailer = require("nodemailer");

// const sendMail = async (req, res) => {
//     let testAccount = await nodemailer.createTestAccount();
//     res.send('email is sending')

//     let transporter = await nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         auth: {
//             user: 'shemar80@ethereal.email',
//             pass: 'JDNBDynCwywr6xe1aS'
//         }
//     });
//     let info = await transporter.sendMail({
//         from: '"@frontend_edy" <shemar80@ethereal.email>',
//         to: "lsahu0838@gmail.com",
//         subject: "Hello edy",
//         text: "Hello world?",
//         html: "<b>Hello frontend_edy</b>",
//     })
    
//     console.log("Message sent: %s", info.messageId);
// }
// app.get('/sendmail', sendMail)