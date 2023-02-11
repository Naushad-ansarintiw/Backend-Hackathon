require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const cors = require('cors');
const Router = require('./routes/router');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;

// Middleware

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST','GET','DELETE','PUT'],
    credentials: true
  }));

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send(";lkjdlksj");
})

app.use('/api',Router);

app.listen(port,()=>{
    console.log(`Server listen at ${port}`);
})