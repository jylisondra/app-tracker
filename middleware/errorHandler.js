const errorHandler = (err, req, res, next) => {
  res.status(500).json({ msg: 'oops error' });
  next(err);
};

export default errorHandler;
