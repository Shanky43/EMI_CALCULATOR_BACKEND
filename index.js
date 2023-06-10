const express = require("express")
const app = express();
const connection = require("./db")
const { userRouter } = require("./Routes/user.route");

const { auth } = require("./Middleware/auth.middleware");
const cors = require("cors");
const { calculateEMIRouter } = require("./Routes/calculateEMI");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/loan-emi-calculator", auth, calculateEMIRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(("Port is running at 8080"))
    } catch (err) {
        console.log("cannot connect to the db")
    }
})