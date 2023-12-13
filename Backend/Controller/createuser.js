const usermodel=require('../Models/Users');
const express = require('express')
const nodemailer = require('nodemailer');
const {body,validationResult}=require('express-validator')
exports.register=async function(req,res)
{
    console.log("hello yo")
    const result = validationResult(req);
  if (!result.isEmpty()) {
   
    return res.status(400).json( {result:result.array()});
  }
    const {
        name,
        email,
        number,
        password,
        location,
        date,
      } = req.body;
      try {
        const userexit = await usermodel.findOne({
          email: email
        });
        const username = await usermodel.findOne({
          name: name
        });
        if (userexit && username) {
          return res.status(422).json({
            error: "email & name is exits"
          });
        } else {
          console.log("create user");
          const object = new usermodel({
            name,
            email,
            number,
            location,
            password,
            date,
          });
          //  hasing of password before save
          const a=await object.save();
          if(a){
            // sendVerifyMail(req.body.name,req.body.email,a._id)
            console.log("verifymail")}
//   try {
//     // 
//     let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: '20ceuon126@ddu.ac.in',
//         pass: 'Jashshah@123'
//     }
// });

// // Define the email options
// let mailOptions = {
//     from: '20ceuon126@ddu.ac.in',
//     to: req.body.email,
//     subject: 'SignUp Successfull!',
//     text: 'Welcome to the site Thanks for registering. Please login to enjoy the facility.'
// };

// // Send the email
// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
//     //})
//   } catch (error) {
//     console.log(error.message);
//   }
//           }
//           return res.status(200).json({
//             message: "register sucessfully"
            
//           });
         }
       }
 catch (err) {
        console.log(err);
      }
     
}
exports.auth=async function(req,res)
{
  const {
    email,
    password
  } = req.body;
  try {
    const user = await usermodel.findOne({ email:email });
    if (user) {
      // const ismatch = await bcrypt.compare(password, user.password);
      if (password!==user.password) {
        return res.status(400).json({
          error: "password incorrect"
        });
      }else if(user==='admin@gmail.com' && password==='admin'){
        return res.render("./admin.js")
      } 
      else {
        
          // sendVerifyMail(req.body.name,req.body.email,a._id)
          console.log("verifymail")
// try {
//   // 
//   let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: '20ceuon126@ddu.ac.in',
//       pass: 'Jashshah@123'
//   }
// });

// // Define the email options
// let mailOptions = {
//   from: '20ceuon126@ddu.ac.in',
//   to: req.body.email,
//   subject: 'Please Verify Yourself!',
//   html: '<p> HI '+email+' please check link for verification <a href="http://localhost:3000/Frontpage">Verify</a></p>'
// };

// // Send the email
// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//       console.log(error);
//   } else {
//       console.log('Email sent: ' + info.response);
//   }
// });
//   //})
// } catch (error) {
//   console.log(error.message);
// }
        
        return res.status(201).json(user);

      }
    }else{
      return res.status(400).send({
        error: "invailad email"
      });
    }
  } catch (err) {
    console.log(err);
  }
}

        


