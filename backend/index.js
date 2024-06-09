import express, { request } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middlware for parsing req body
app.use(express.json());

//Middlware for parsing CORS policy
//1: Allow all origins with default of cors (*)
app.use(cors());
//2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mern");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log(`app listen ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
