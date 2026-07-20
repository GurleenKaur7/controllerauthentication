
import mysql from "mysql2/promise";

async function migrateAuthenticationTable() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "gbakshi21@0618",
        database: "new_sql"
    });

    try {
        // Drop old table (if exists)
        await connection.execute(`
            DROP TABLE IF EXISTS authentication;
        `);

        // Create new table with email column
        await connection.execute(`
            CREATE TABLE authentication (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,   
                password VARCHAR(255) NOT NULL,
                gender ENUM('male','female') NOT NULL,
                birth_year INT NOT NULL,
                designation VARCHAR(100) UNIQUE,
                company_name VARCHAR(150) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log(" Authentication table created successfully!");
    } catch (err) {
        console.error(" Migration failed:", err);
    } finally {
        await connection.end();
    }
}

migrateAuthenticationTable();
