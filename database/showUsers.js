
import { db } from "./database/db.js";

const showUsers = async () => {
  const [rows] = await db.query("SELECT * FROM authentication");
  console.table(rows);
  process.exit();
};

showUsers();