function errorHandler(error, req, res, next) {
  console.log(error);

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({ message: error.errors[0].message });
  } else if (error.name === "ErrorDataNotFound") {
    res.status(404).json({ message: error.message });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
  } else if (error.name === "AuthenticationError") {
    res.status(401).json({ message: error.message });
  } else if (
    error.name === "UnauthorizedError" ||
    error.name === "JsonWebTokenError"
  ) {
    res.status(401).json({ message: "Authentication Error - Invalid Token" });
  } else if (error.name === "ForbiddenError") {
    res.status(403).json({
      message: "Unauthorized - You don't have permission to do this action",
    });
  } else if (error.name === "InternalServerError") {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
