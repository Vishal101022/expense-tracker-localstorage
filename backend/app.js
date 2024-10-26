const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./util/db");
const router = require("./routes/expenseRoutes");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRoutes");

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:5500"
    ],
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/', userRouter);
app.use('/', loginRouter);

// test connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();

app.listen(3000, () => {
    console.log("Server started on port 3000");
})