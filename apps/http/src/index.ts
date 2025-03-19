import "dotenv/config";
import express from "express";
import {
  CardSchema,
  SigninSchema,
  SignupSchema,
  UpdateCardSchema,
} from "./types";
import { prismaClient } from "@card/db/prisma";
import { hashByPassword } from "./utils";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get("/", () => {
  console.log("Server running OK !");
});

//POST Create account
app.post("/signup", async (req, res) => {
  const parsedBody = SignupSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Failed to validate" });
    return;
  }
  const userExist = await prismaClient.user.findFirst({
    where: {
      username: parsedBody.data?.username,
    },
  });
  if (userExist) {
    res.status(400).json({ message: "Username already exist" });
    return;
  }
  const myPassword = await hashByPassword(parsedBody.data?.password);
  try {
    const newUser = await prismaClient.user.create({
      data: {
        username: parsedBody.data?.username,
        password: myPassword,
      },
    });
    const token = jwt.sign(
      { id: newUser?.id, username: newUser?.username },
      process.env.JWT_SECRET!
    );
    res.json({ message: "New user created", newUser, token });
  } catch (error) {
    res.json({ message: "Failed to create new user", error });
  }
});

//POST Login account
app.post("/signin", async (req, res) => {
  const parsedBody = SigninSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Failed to validate" });
    return;
  }
  const myPassword = await hashByPassword(parsedBody.data?.password);

  try {
    const userFound = await prismaClient.user.findUnique({
      where: {
        username: parsedBody.data?.username,
        password: myPassword,
      },
    });
    const token = jwt.sign(
      { id: userFound?.id, username: userFound?.username },
      process.env.JWT_SECRET!
    );
    res.json({ message: "Login successfully", token });
  } catch (error) {
    res.json({ message: "Failed to login", error });
  }
});

//POST Create card
app.post("/card", async (req, res) => {
  const parsedBody = CardSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "Failed to validate !" });
    return;
  }
  try {
    const newCard = await prismaClient.card.create({
      data: parsedBody.data,
    });
    res.json({ message: "Card created successfully !", cardId: newCard.id });
  } catch (error) {
    res.status(400).json({ message: "Failed to create card !" });
  }
});

//GET card
app.get("/card/:userId", async (req, res) => {
  const userId = req.params.userId as string;
  try {
    const myCard = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        card: true,
      },
    });
    res.json({ card: myCard });
  } catch (error) {
    res.status(400).json({ message: "No card found" });
  }
});

//PUT update card
app.put("/card/:cardId", async (req, res) => {
  const parsedBody = UpdateCardSchema.safeParse(req.body);
  if (!parsedBody.data) {
    res.status(400).json({ message: "Cant update undefined data !" });
    return;
  }
  if (!parsedBody.success) {
    res.status(400).json({ message: "Failed to parse data !" });
    return;
  }

  try {
    const updatedCard = await prismaClient.card.update({
      where: {
        id: req.params.cardId,
      },
      data: parsedBody.data,
    });
    res.json({ message: "card updated successfully !", updatedCard });
  } catch (error) {
    res.json({ message: "Failed to update card !", error });
  }
});


app.listen(3000, ()=> {
  console.log("http Server Running on : http://localhost:3000")
})