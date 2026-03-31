const logMiddleware = (req, res, next) => {
  console.log(`Method: ${req.method}, url: ${req.url}`);
  next();
}

export default logMiddleware;