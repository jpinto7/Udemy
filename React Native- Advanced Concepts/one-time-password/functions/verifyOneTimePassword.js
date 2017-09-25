const admin = require('firebase-admin');

module.exports = function(req, res) {
  let {
    code = '',
    phone = ''
  } = req.body;
  if (!code || !phone) {
    return res.status(422).send({ error: 'You must provide a code and a phone number' });
  }
  code = parseInt(code);
  phone = String(phone).replace(/[^\d]/g, '');
  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);
      ref.on('value', (snapshot) => {
        ref.off();
        const user = snapshot.val() || {};
        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Your code is not valid' });
        }
        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone)
          .then((token) => {
            res.send({ token });
          });
      });
    })
    .catch((error) => {
      res.status(422).send({ error });
    });
};
