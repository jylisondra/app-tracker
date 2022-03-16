class CustomAPIError extends Error {
  constructor(msg) {
    super(msg); // calls parent class Error constructor
  }
}

export default CustomAPIError;
