
import mysql from "mysql2/promise";
async function createTables(){
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "gbakshi21@0618",
        database: "new_sql" 

    });

    const createAuthenticationTable = `
    CREATE TABLE IF NOT EXISTS authentication (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;


    await connection.execute(createAuthenticationTable);
    console.log("Authentication table created!");
    await connection.end();
}


createTables();