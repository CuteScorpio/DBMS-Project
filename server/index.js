require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
const userRouter = require('./App/routes/userRoutes');
let app = express();
app.use(express.json());
let cors = require('cors');
const productRouter = require('./App/routes/productRoutes');
app.use(cors());

app.use('/user', userRouter); 
app.use('/products', productRouter);

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


