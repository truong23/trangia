const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function importSql() {
  console.log('Đang kết nối tới MySQL...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    const dbName = process.env.DB_NAME || 'deltagroup_news';
    
    console.log(`Xóa database ${dbName} nếu đã tồn tại và tạo lại...`);
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    await connection.query(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbName}\`;`);

    const sqlFilePath = path.join(__dirname, '../databasetrangia.sql');
    console.log(`Đọc file ${sqlFilePath}...`);
    let sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Fix unknown collation for older MySQL/MariaDB servers
    sql = sql.replace(/utf8mb4_0900_ai_ci/g, 'utf8mb4_unicode_ci');

    console.log('Đang thực thi các câu lệnh SQL (Quá trình này có thể mất vài giây)...');
    await connection.query(sql);
    
    console.log('Nhập dữ liệu thành công!');
    await connection.end();
  } catch (error) {
    console.error('Lỗi khi import database:', error);
  }
}

importSql();
