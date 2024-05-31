const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists in postgres

    const user = await prisma.user.findUnique({
      where: { email, isDeleted: false },
    });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in postgres
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    let { id } = req.params;
    id = +id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    // Check if the user exists in postgres
    const user = await prisma.user.findUnique({
      where: { id, isDeleted: false },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    let { id } = req.params;
    id = +id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    // Check if the user exists in postgres
    const user = await prisma.user.findUnique({
      where: { id, isDeleted: false },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from postgres
    await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    let { id } = req.params;
    id = +id;
    const { name, email } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id, isDeleted: false },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: { email, isDeleted: false },
    });

    if (userWithEmail && userWithEmail.id !== id) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    // Get all users from postgres
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: { id: true, name: true, email: true },
    });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
