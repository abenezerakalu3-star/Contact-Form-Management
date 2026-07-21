import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/error.middleware.js";
import { ConnectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Contact Form Management API",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

app.use(errMiddleware); // error middleware

app.listen(PORT, async () => {
  await ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});

