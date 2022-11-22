const client = require('./database');
const database = require('./database');

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },
  async getCard(id) {
    const queryResult = await client.query( `SELECT * FROM card WHERE "id" = ${id}`,
    );
    if (queryResult.rowCount === 1){
      return queryResult.rows[0]
    } else {
      return null;
    }
    
  }
};


module.exports = dataMapper;
