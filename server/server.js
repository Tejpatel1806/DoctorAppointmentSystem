const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const cors = require('cors')
connectDB();


//rest object
//aano matlab express na badha features app ma aavi jase
const app = express();

//middlewares
app.use(express.json());//(parsing related error nai made)aano matlab body ma json object moklsu to error nai aave
app.use(moragan('dev'));
app.use(cors())
//routes

//aa niche vadu khali test purpose mate add karyu hatu actually route have add thase
// app.get('/', (req, res) => {
//     res.status(200).send({
//         message: "Server Running",
//     });
// });
app.use('/api/v1/user', require("./routes/userRoutes"));
//upar ni line no matlab evo thay k any incoming HTTP request which path starting from
//"/api/v1/user" is handled by the userRoutes module 
app.use('/api/v1/admin', require("./routes/adminRoutes"));
app.use('/api/v1/doctor', require("./routes/doctorRoutes"));

//aa port number env file mathi lai lese bydefault 8080 rehse
const port = process.env.PORT || 5000
//listen karva mate koi port upar
app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`);
})