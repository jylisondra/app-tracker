const notFoundMiddleware = (req, res) =>
  res.status(404).send('Error - Route does not exist');

export default notFoundMiddleware;
