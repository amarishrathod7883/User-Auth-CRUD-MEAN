const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(`mongodb://localhost:27017/MEANPractical`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
.then(() => {
  console.log("Successful connect to mongo");
})
.catch(error => {
  console.log("connection error", error);
});

var corsOption = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/' , require('./app/routes'));

app.get('/', (req, res) => {
  res.json({message: "Welcome to Node."})
});

const PORT = process.env.PORT || 8080;
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () =>{
  console.log(`API Running on : ${PORT}`);
});