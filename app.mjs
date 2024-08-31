// externel import
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createServer } from 'http';
import mysql from 'mysql2/promise';
// internal import
import { notFoundHandler, errorHandler } from './middleware/common/errorHandler.mjs';
import authRouter from './router/auth.mjs';
import signUpRouter from './router/signUp.mjs';
import createTables from './database/createTables.mjs';
import timeTrackerRouter from './router/timeTracker.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

const app = express();
const server = createServer(app);

// database connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER ,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const maxRetries = 10;
const delay = 3000; 
async function getConnectionWithRetry(retries = maxRetries) {
  let conn;
  try {
    conn = await pool.getConnection();
    // console.log('Connected to MySQL successfully');
    createTables(conn); 
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return getConnectionWithRetry(retries - 1);
    } else {
      // console.error('Failed to connect to MySQL after multiple attempts:', err.message);
      process.exit(1);
    }
  } finally {
    if (conn) conn.release(); 
  }
}
getConnectionWithRetry();

// req parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    // origin: '*', // using this one prevents from setting cookies in client side
    credentials: true
  })
);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/api/auth', authRouter); 
app.use('/api/signUp', signUpRouter);
app.use('/api/timeTracking', timeTrackerRouter);

//404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  // console.log(`Server running at port ${process.env.PORT}...`)
});

export default pool;

