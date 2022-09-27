import mongoose from "mongoose";

const connection = async (MONGO_URI) => {
  try {
    await mongoose.connect(
      MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("DB Connected Successfully");
      }
    );
  } catch (error) {
    console.log(`Error while connecting to the database ${error}`);
  }
};

export default connection;
