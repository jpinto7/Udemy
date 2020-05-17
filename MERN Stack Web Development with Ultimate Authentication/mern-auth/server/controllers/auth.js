const User = require('../models/user');

// exports.signup = (req, res) => {
//   const { name, email, password } = req.body;
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: 'Email is taken'
//       });
//     }
//     let newUser = new User({
//       name,
//       email,
//       password
//     });
//     newUser.save((err, success) => {
//       if (err) {
//         return res.status(400).json({
//           error: err
//         });
//       }
//       res.json({
//         message: 'Signup success! Please signin'
//       });
//     });
//   });
// };

exports.signup = (req, res) => {

};
