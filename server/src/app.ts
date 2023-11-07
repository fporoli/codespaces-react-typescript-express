import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expRouter from './routes/expenseRoute';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use("/expenses", expRouter);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Expense Manager Server is running at http://localhost:${port}`
  );
});
