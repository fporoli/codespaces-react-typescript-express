import express, { Request, Response } from "express";
import {
  getExpenses,
  create,
  remove,
  reset,
  update,
  find,
} from "../models/expenseDataStore";
import Expense from "../models/expense";

const expRouter = express.Router();

expRouter.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(getExpenses());
  } catch (e) {
    res.status(500).send({ message: "500-Internal Server Error: " + e });
  }
});

expRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item = find(id);
    if (item) {
      return res.status(200).send(item);
    }
    res.status(404).send("Expense not found");
  } catch (e) {
    res.status(500).send({ message: "500-Internal Server Error: " + e });
  }
});

expRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: Expense = req.body;
    const newItem = create(item);
    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).json({ message: "500-Internal Server Error: " + e });
  }
});

expRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Expense = req.body;
    const existingItem = find(id);
    if (existingItem) {
      if (id === itemUpdate.id || find(itemUpdate.id) === undefined) {
        // ok to update when Id is unchanged or to update Id object to not existing Id.
        const updatedItem = update(id, itemUpdate);
        return res.status(200).json(updatedItem);
      }
      return res.status(500).send("Cannot update. Id exists already!");
    }
    return res.status(500).send("Cannot update. Id does not exists!");
  } catch (e) {
    res.status(500).send({ message: "500-Internal Server Error: " + e });
  }
});

expRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    remove(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send({ message: "500-Internal Server Error: " + e });
  }
});

expRouter.patch("/", async (req: Request, res: Response) => {
  try {
    reset();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send({ message: "500-Internal Server Error: " + e });
  }
});

export default expRouter;
