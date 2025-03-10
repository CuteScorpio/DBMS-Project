
require('dotenv').config();


let express = require('express');
let app = express();
app.use(express.json());
let mongoose = require('mongoose');



mongoose.connect(process.env.mongoURL).then(() => {
    console.log('Connected to database!');
    app.listen(process.env.port, () => {
        console.log('Server is running on http://localhost:'+process.env.port);
      });

  }).catch(() => {
    console.log('Connection failed!');
  });
