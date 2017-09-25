const admin = require('firebase-admin');

module.exports = (req, res) => {
  let { phone = '' } = req.body;
  if (!phone) {
    return res.status(422).send({
      error: 'Bad input'
    });
  }
  phone = String(phone).replace(/[^\d]/g, '');
  admin.auth().createUser({
    uid: phone
  }).then((user) => {
    res.send(user);
  }).catch((error) => {
    res.status(422).send({ error });
  });
};
