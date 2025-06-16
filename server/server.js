import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
const app = express();

await connectDB();
//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/',(req,res)=>{
  res.send("API is working");
});
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`server is running on the port ${PORT}`);
});
export default app;