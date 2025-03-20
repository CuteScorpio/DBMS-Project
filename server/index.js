require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
const productRouter = require('./App/routes/productRoutes');
let app = express();
app.use(express.json());

app.use('/product', productRouter);

// connect to MongoDB
mongoose.connect(process.env.mongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port ' + process.env.PORT);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


