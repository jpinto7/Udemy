const errorHandler = (err, req, res, next) => {
  console.log('jiyuyu');
  if (req.xhr) {
    const { errors } = err;
    let messages = {};
    if (errors) {
      Object.keys(errors).forEach((error) => {
        messages[error] = errors[error].message;
      });
      res.status(422).json({ success: false, error: messages });
    }
    res.status(4220).send({ success: false, error: 'Validation error ocurred' });
  } else {
    next(err);
  }
};

export default errorHandler;
