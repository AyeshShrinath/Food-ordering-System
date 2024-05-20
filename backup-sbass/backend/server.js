import express from "express";
import cors from "cors";
import router from "./api/routes.js";
import mongoose from "mongoose";

const port = 3000;

const app = express();

/* middlewares */
app.use(express.json());
app.use(cors());

//app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));

/* HTTP GET Request */
app.get("/server", (req, res) => {
  res.status(201).json("Backend server.js connected and Working!");
});

/* API Routes */
app.use("/", router);

const uri =
  "mongodb+srv://Anuja:ManuK@anujapossystem.t1itzgb.mongodb.net/Anuja_Super_Mart?retryWrites=true&w=majority";

async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("Connected to MongoDB database");
    return true;
  } catch (error) {
    console.log("Cannot connect to the database: ", error);
  }
}

await connect();

/* start server */
try {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Server Not Running! - Error :-" + error.getMessage());
  }
} catch (error) {
  console.log("Cannot connect to the database");
  console.log("Server Not Running!");
}
