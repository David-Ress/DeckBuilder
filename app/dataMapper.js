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
  },
  async searchResultByElement(element) {
    const searchResult = await client.query (`SELECT * FROM card WHERE "element" IS NOT NULL AND "element"='${element}'`)
    return searchResult.rows
  } ,

  async searchResultByLevel(level) {
    const searchResult = await client.query (`SELECT * FROM card WHERE "level" ='${level}'`)
    return searchResult.rows
  } ,
  
  async searchResultByValue(direction, value) {
    const searchResult = await client.query (`SELECT * FROM card WHERE value_${direction} >= ${value}  `)
    return searchResult.rows
  },

  async searchResultByName(name){
    //TODO : RECHERCHE PAR NOM
    const searchResult = await client.query (`SELECT * FROM card WHERE name LIKE '${name.toLowerCase()}' `)
    return searchResult.rows
  }
};


module.exports = dataMapper;
