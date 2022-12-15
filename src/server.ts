import express, { Application, Request, Response, NextFunction } from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import goalRoutes from "./routes/goalRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleWare/errorMiddleware";


const port = process.env.PORT || 5000;

connectDB().then((r) => console.log(`MongoDB Connected : ${r}`));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

//serve frontend
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))
//
//     app.get('*', (req: any, res: { sendFile: (arg0: string) => void; })=>{
//         res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
//     })
// }else{
//     app.get('/', (req: any, res: { send: (arg0: string) => any; })=> res.send('Please set to production'))
// }

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
