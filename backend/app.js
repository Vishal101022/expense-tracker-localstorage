const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./util/db");
const helmet = require('helmet');
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const fs = require("fs");
// routes
const expenseRouter = require("./routes/expenseRoutes");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRoutes");
const isPremiumRouter = require("./routes/isPremiumRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const lederboardRouter = require("./routes/lederboardRoutes");
const forgotPassRouter = require("./routes/forgotPassRoutes");
const downloadRouter = require("./routes/expenseRoutes")
// models
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/orderModel");
const download = require("./models/download");
const path = require("path");

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }  ,
);

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

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', expenseRouter);
app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', isPremiumRouter);
app.use('/', purchaseRouter);
app.use('/premium', lederboardRouter);
app.use('/password', forgotPassRouter);
app.use('/', downloadRouter);

// test connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
        await db.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
testConnection();

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(download);
download.belongsTo(User);

app.listen(port, () => {
    console.log("Server started on port 3000");
})