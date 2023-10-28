export default {
  port: process.env.PORT || 5050,
  mongoUrl:
    process.env.MONGO_ULR || "mongodb://localhost:27017/survey-for-devs",
};
