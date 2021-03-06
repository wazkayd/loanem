import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const createTable = `

CREATE TABLE IF NOT EXISTS users 
(user_id SERIAL PRIMARY KEY, 
    user_email VARCHAR NOT NULL UNIQUE, 
    user_password VARCHAR NOT NULL,
    user_file_no VARCHAR,
    user_role VARCHAR NOT NULL DEFAULT 'user',
    user_name VARCHAR,
    user_dept VARCHAR,
    user_address VARCHAR, 
    user_phone VARCHAR, 
    user_image VARCHAR); 

    CREATE TABLE IF NOT EXISTS files_data 
    (file_id SERIAL PRIMARY KEY,
      user_file_no VARCHAR NOT NULL UNIQUE);

    CREATE TABLE IF NOT EXISTS loans(
      loan_id SERIAL PRIMARY KEY,
      user_id int REFERENCES users(user_id) NOT NULL,
      user_dept VARCHAR,
      user_name VARCHAR,
      user_email VARCHAR,
      user_file_no VARCHAR,
      loan_amount INTEGER,
      loan_amount_to_pay INTEGER,
      loan_pay_per_month INTEGER,
      loan_interest INTEGER,
      loan_payment_duration VARCHAR,
      loan_guarantor_one VARCHAR,
      loan_guarantor_two VARCHAR,
      loan_guarantor_three VARCHAR,
      loan_guarantor_four VARCHAR,
      loan_status VARCHAR DEFAULT 'new',
      loan_added_date TIMESTAMP NOT NULL DEFAULT NOW()    
  );`;

const connectionString = process.env.DATABASE_URL || process.env.LOCAL_DB_URL;
/**
 * Represents the connection of the app to postgreSql database.
 */
class DbConnect {
  /**
     * Create database connection.
     * @param {Promise} pool - takes in the connection string
     * which is based on the environment
     */
  constructor() {
    this.pool = new Pool({ connectionString });
  }

  /**
     * This function creates all needed tables
     * @returns {Promise} Returns promise that creates all table if resolved
     * or error if rejected
     */
  createAllTables() {
    this.pool.query(createTable)
      .then(() => {
        const commName = process.env.COMMITTEE_NAME;
        const presName = process.env.PRESIDENT_NAME;
        const tresName = process.env.TRESURER_NAME;
        const commEmail = process.env.COMMITTEE_EMAIL;
        const presEmail = process.env.PRESIDENT_EMAIL;
        const tresEmail = process.env.TRESURER_EMAIL;
        const presidentPassword = process.env.PRESIDENT_PASSWORD;
        const committeePassword = process.env.COMMITTEE_PASSWORD;
        const tresurerPassword = process.env.TRESURER_PASSWORD;
        const tresurerHashPassword = bcrypt.hashSync(tresurerPassword, 10);
        const presidentHashPassword = bcrypt.hashSync(presidentPassword, 10);
        const committeeHashPassword = bcrypt.hashSync(committeePassword, 10);
        const userRole = 'admin';
        const commRole = 'commadmin';
        const tresRole = 'tresadmin';
        const userDept = 'Administrative';
        const fileNO = process.env.ADMIN_FILE_NO;
        const sql = `INSERT INTO 
        users(user_name, user_email, user_password, user_role, user_dept, user_file_no) 
        VALUES ($1, $2, $3, $4, $13, $1), ($5, $6, $7, $8, $13, $5), ($9, $10, $11, $12, $13, $9) 
        ON CONFLICT DO NOTHING;`;
        const params = [commName,
                        commEmail,
                        committeeHashPassword, 
                        commRole,
                        presName, 
                        presEmail,
                        presidentHashPassword,
                        userRole, 
                        tresName,
                        tresEmail,
                        tresurerHashPassword,  
                        tresRole,
                        userDept];
        this.pool.query(sql, params).then(() => {
          
          const sql = `INSERT INTO files_data(user_file_no) 
          SELECT x FROM unnest(ARRAY[9999, 1000, 1001, 1002, 1003, 
            1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 
            1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 
            1020]) x ON CONFLICT DO NOTHING;`;

          this.pool.query(sql).then(() => {
            console.log('App started successfully');
          });

        });
      });
  }

  /**
     * This function connects the app to database base on different environment
     * @returns {Promise} Returns promise that connect the app to db if resolved
     * or error if rejected
     */
  connectApp() {
    this.pool.connect()
      .then(() => {
          this.createAllTables();
      });
  }
}
export default DbConnect;
