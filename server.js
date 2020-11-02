const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');


app.get('/game',(req,res)=> {
  res.render('game');
})

app.get('/end',(req,res)=> {
  res.render('end');
})

app.get('/',(req,res)=> {
  res.render('home');
})


app.listen(PORT, () => console.log(`This server is running on port ${PORT}`));