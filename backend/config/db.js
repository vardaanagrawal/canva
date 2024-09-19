const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect(`${process.env.MONGO_URL}`).then(
    () => {
      console.log("Connected to MongoDB successfully");
    },
    (err) => {
      console.log("Error Occured while connecting database");
    }
  );
};
module.exports = connectDB;
