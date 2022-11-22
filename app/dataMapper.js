const client = require('./database');
const database = require('./database');

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },
  getCard: async (id, callback) => {
    const queryResult = await client.query( `SELECT * FROM card WHERE "id" = ${id}`,
    );
    if (queryResult.rowCount === 1){
      return queryResult.rows[0];
    } else {
      return null;
    }
  },
  searchResultByElement: async (element, callback) => {
    let query
    if (element === 'null') {
      query= {
        text:`SELECT * FROM "card" WHERE "element" IS NULL`
      };
    } else {
      query = {
        text: `SELECT * FROM "card" WHERE "element" = $1`,
        values:[element]
      };
    }
    const results = await database.query(query);
    return results.rows
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
    const query = {
      text:`SELECT * FROM card WHERE name ILIKE $1 `, values: [`%${name}%`]
    };
    const searchResult =  await database.query(query)
    return searchResult.rows
  }
};


module.exports = dataMapper;
