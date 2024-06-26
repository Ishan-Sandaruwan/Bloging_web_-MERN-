import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "user controller is also working " });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.username) {
    if (req.body.username.includes(" ")) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(403, "Username cannot contain spaces"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(403, "Username can only contain letters and numbers")
      );
    }
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  const userToDelete = req.query.delete;
  if (userToDelete) {
    if (!req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this account ")
      );
    }
    try {
      await User.findByIdAndDelete(userToDelete);
      res.status(200).json("account has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been signout");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "you are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseFloat(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
