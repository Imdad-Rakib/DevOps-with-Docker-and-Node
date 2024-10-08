const createTempTokenTable = async(connection) =>{
  const sql = `CREATE TABLE IF NOT EXISTS tempToken (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
  );`;
  try {
    await connection.execute(sql);
  } catch (err) {
    console.log(err);
  }
};
export default createTempTokenTable;