
import express from "express";
import path from "path";
import { authRoutes } from "./routes/auth.route.js";

const app = express();

app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/*app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});*/
//app.use(authRoutes);
app.use( authRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
