import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 5000;




// middleware
app.use(express.json());
app.use(cors({credentials: true}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Contact Form Management API",
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});