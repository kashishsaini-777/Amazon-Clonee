import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import { users } from "../users.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();


// 🌱 Seed Users
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.destroy({ where: {}, truncate: true });

    const createdUsers = await User.bulkCreate(users);

    res.send({ createdUsers });
  })
);


// 🔐 Sign In
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }

    res.status(401).send({ message: "Invalid email or password." });
  })
);


// 📝 Register
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const createdUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.send({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);


// 🔍 Get User by ID
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);


// 👤 Update Profile
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (user) {
      await user.update({
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password
          ? bcrypt.hashSync(req.body.password, 8)
          : user.password,
      });

      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);


export default userRouter;