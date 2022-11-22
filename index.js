const dotenv = require('dotenv');
const express = require('express');
const expressSession = require('express-session')
dotenv.config();

const router = require('./app/router');

const app = express();

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

app.use((req, res, next) => {
  if (!req.session.deck){
  req.session.deck = [];
  } 
next()
}
);


app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(router);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
