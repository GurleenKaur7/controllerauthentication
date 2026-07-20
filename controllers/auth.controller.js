
import { getUserByEmail, getUserByUsername, createUser, getAllUsers } from "../database/user.helpers.js"; 
import bcrypt from "bcrypt";

// Render signup page
export const getSignupPage = (req, res) => { 
    return res.render("auth/signup", { error: null });
};

// Handle signup form submission
export const postSignupPage = async (req, res) => {
    try {
        const { username, email, gender, birth_year, designation, company_name, password } = req.body;

        // Check if username already exists
        const userByUsername = await getUserByUsername(username); 
        if (userByUsername) return res.render("auth/signup", { error: "Username already exists!" });

        // Check if email already exists
        const userByEmail = await getUserByEmail(email);
        if (userByEmail) return res.render("auth/signup", { error: "Email already exists!" });

        // Create user (password is hashed inside createUser)
        await createUser({
            username,
            email,
            gender,
            birth_year,
            designation,
            company_name,
            password
        });

        res.redirect("/login");
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render login page
export const getLoginPage = (req, res) => { 
    return res.render("auth/login", { error: null });
};

// Handle login form submission
export const postLoginPage = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Find user by username
        const user = await getUserByUsername(username);

        // Check if user exists and email matches
        if (!user || user.email !== email) {
            return res.render("auth/login", { error: "Invalid username or email!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render("auth/login", { error: "Invalid password!" });

        // Fetch all users and render dashboard
        const users = await getAllUsers();
        res.render("dashboard", { users });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
};