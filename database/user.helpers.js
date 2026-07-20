
import { db } from "./db.js";
import bcrypt from "bcryptjs";

// GET user by username
export const getUserByUsername = async (username) => {
    const [rows] = await db.query(
        "SELECT * FROM authentication WHERE username = ?",
        [username]
    );
    return rows[0]; // same as your logic
};

// GET user by email
export const getUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM authentication WHERE email = ?",
        [email]
    );
    return rows[0]; // same as your logic
};

// CREATE new user
export const createUser = async (userData) => {
    // hash password inside the helper
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const [result] = await db.query(
        "INSERT INTO authentication (username, email, gender, birth_year, designation, company_name, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            userData.username,
            userData.email,
            userData.gender,
            userData.birth_year,
            userData.designation,
            userData.company_name,
            hashedPassword
        ]
    );

    return result.insertId; // same as your logic
};

// GET all users
export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM authentication");
    return rows; // same as your logic
};