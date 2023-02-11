import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routers/userRoutes.js'
import orderRoutes from './routers/orderRoutes.js'
import productRoutes from './routers/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './utils/db.js';
import cors from 'cors'


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)


app.get('/', (req, res) => {
  res.send('Server is ready');
});



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )});
