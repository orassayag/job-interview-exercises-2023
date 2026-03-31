const validateRequest = (req, res, next) => {
  if (req.method === 'DELETE') {
    const error = new Error();
    error.status = 403;
    error.message = 'Delete is forbidden!';
    throw error;
  }
  return next();
}

export default validateRequest;