import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import { connectDB } from "./DB.js";
import userRoutes from "./routes/UserRoutes.js";
import carRoutes from "./routes/CarRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// passport
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// rotte api
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));