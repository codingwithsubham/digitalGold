module.exports = {
  //Status Codes
  STATUS_CODE_200: 200,
  STATUS_CODE_401: 401,
  STATUS_CODE_400: 400,
  STATUS_CODE_404: 404,
  STATUS_CODE_500: 500,

  //Auth
  EMAIL: "email",
  MOBILE: "mobile",
  PASSWORD: "password",

  //Constants For Auth API Start
  SERVER_ERROR: "Internal Server Error",
  USER_LOGGEDIN: "User LoggedIn",
  INVALID_EMAIL: "Please include valid Email",
  PASSWORD_REQUIRED: "Password is required",
  INVALID_CREDENTIALS: "Invalid Credentials",
  MOBILE_REQUIRED: "Mobile Number Required",
  BAD_REQUEST: "Bad Request",

  //AUTH
  INVALID_TOKEN: "Token is Invalid.",
  AUTH_DENIED: "Authorization Denied.",
  NO_TOKEN: "No Token.",
  NOT_FOUND: "NOT FOUND",
  EXPIRES_IN: "30d",
  JWT_SECRET: "jwtSecret",
  COMMON_PASSWORD: "password",
  MONGO_URI_CLOUD:
    "mongodb+srv://admin:nimda@goldwallet.okyofi2.mongodb.net/?retryWrites=true&w=majority",
  
  //Transactions
  CREDIT: "Credit",
  DEBIT: "Debit",
  //Logic
  LOWER: "LOWER",
  SECOND_LOWER: "SECOND_LOWER",
  GAME_NAME: "WHEEL",
  //status
  PENDING: "Pending",
  APPROVED: "Approved",
  TRANSFERED: "Transfered",
};
