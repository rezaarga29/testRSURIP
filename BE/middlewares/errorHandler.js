function errorHandler(error, req, res, next) {
  if (error.name === "InvalidPrice") {
    res.status(404).json({ message: "Price cannot be below 15000" });
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "FileRequired" ||
    error.message === "Unexpected end of form" ||
    error.name === "EmptyInput"
  ) {
    res.status(400).json({ message: "validation error" });
  } else if (error.name === "InvalidInput") {
    res.status(404).json({ message: "data not found" });
  } else if (error.name === "InvalidUser") {
    res.status(401).json({ message: "invalid email or password" });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "InvalidToken"
  ) {
    res.status(401).json({ message: "Error authentication" });
  } else if (error.name === "Forbidden") {
    return res.status(403).json({ message: `your not authorized` });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = errorHandler;
