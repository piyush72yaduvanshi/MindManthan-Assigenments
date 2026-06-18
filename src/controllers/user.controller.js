import { users } from "../data/user.js";

export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllUsers = (req, res) => {
  try {
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateUser = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (email) {
      user.email = email;
    }
    if (name) {
      user.name = name;
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteUser = (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
