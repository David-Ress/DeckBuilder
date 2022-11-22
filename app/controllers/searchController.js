const dataMapper = require('../dataMapper.js');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },
  searchByElement: async (req, res) => {
    try {
      searchedElement = req.query.element
      searchResult = await dataMapper.searchResultByElement(searchedElement);
      console.log(searchResult)
      res.render('searchResultElement' , {cards : searchResult, searchedElement })
    } catch(error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
    
  }
};

module.exports = searchController;