const createError = (request, status, message, errors) => (
  request.status(status).json({
    success: false,
    errors,
    message,
  })
);

export default createError;
