const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: 'pg',
  connection: {
  	connectionString : process.env.DATABASE_URL,
  	ssl: true 
    //host : 'postgresql-defined-59741',
    //user : 'postgres',
    //password : 'adminadmin',
    //database : 'face-app'
  }
});

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
	res.send('It is working');
})

app.post('/signIn', signin.signinHandler(bcrypt,db))

app.post('/register', (req, res) => {
	register.registerHandler(req,res,bcrypt, db)
})


app.get('/profile/:id', (req,res) => {
	profile.profileHandler(reg, res, db)
})

app.post('/image', (req, res) => {
	image.imageHandler(req, res)
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})