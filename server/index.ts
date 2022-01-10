import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
// importing routes
import usersRouter from "./routes/users";

// Middlewares

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
    res.send("Welcome Home");
});

app.use("/api/users", usersRouter);

// Server Listenning

const port = process.env.PORT || "5000";
app.listen(port, () => {
    console.log(`Server listening as port ${port}`);
});
