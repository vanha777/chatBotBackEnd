import express, { urlencoded, json } from 'express';


//const bcrypt = require('bcrypt-nodejs');
import cors from 'cors';
import knex from 'knex';
import handleChat from './controllers/chat.js'



//const register = require('./controllers/register.js');
//const signin = require('./controllers/signin.js');
//const faceDetect = require('./controllers/faceDetect.js');
//const getUser = require('./controllers/getUser.js');
//const images = require('./controllers/images.js');


//declareDatabase
{/*}
const dataBase = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});
*/}
//end.








const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => { res.send('Welcome') });

//app.post('/signin', handleSignin(bcrypt, dataBase));

app.post('/chat', (req, res) => { handleChat(req, res) });

app.post('/test', (req, res) => { res.json('sdasd') });

//app.post('/register', handleRegister(bcrypt, dataBase));



//app.get('/profile/:id', _getUser(dataBase))

const port = process.env.PORT || 777;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});