const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  let { phone = '' } = req.body;
  if (!phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }
  phone = String(phone).replace(/[^\d]/g, '');
  admin.auth().getUser(phone)
    .then((user) => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: '+16023629716'
      }, (error) => {
        if (error) {
          return res.status(422).send({ error: error });
        }
        admin.database().ref(`users/${phone}`).update({ code, codeValid: true }, () => {
          res.send({ success: true });
        });
      });
    })
    .catch((error) => {
      res.status(422).send({ error });
    });
};
