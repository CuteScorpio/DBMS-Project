require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
const userRouter = require('./App/routes/userRoutes');
const productRouter = require('./App/routes/productRoutes');
const orderRouter = require('./App/routes/orderRoutes');
let app = express();

let cors = require('cors');
app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/user', userRouter); 
app.use('/products', productRouter);
app.use('/orders',orderRouter)

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


