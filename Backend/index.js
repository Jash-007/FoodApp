const dotenv=require("dotenv");
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
mongoose.set('strictQuery', false);
var cors = require('cors')

const express=require('express');
const app=express();
const { auth } = require('express-openid-connect');
const setupProxy = require("../frontend/src/setupProxy.js");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'Cg9F2N6qz9hnkJ2rnoMpQ77Vz5pYqRdG',
  issuerBaseURL: 'https://dev-kfn2sbkoqz2ijx1d.us.auth0.com'
};
app.use(cors());
app.use(auth(config));
dotenv.config({path :'.env'});
require('./DB/config')
app.use(express.urlencoded({ extended :false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:8000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
})
app.use(express.json())
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST', // Allow only specific methods
  credentials: true, // Allow cookies and other credentials to be sent
}));
app.use(require('./Router/user.js'));
const port =process.env.port;
app.listen(port,()=>{
    console.log(`server is running on ${port} port`);
})