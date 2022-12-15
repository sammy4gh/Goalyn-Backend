"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middleWare/errorMiddleware");
const port = process.env.PORT || 5000;
(0, db_1.default)().then((r) => console.log(`MongoDB Connected : ${r}`));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/goals", goalRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
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
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
