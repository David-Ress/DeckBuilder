const dataMapper = require('../dataMapper.js');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  // la méthode pour chercher par élément
  searchByElement: async (req, res) => {
    try {
      searchedElement = req.query.element
      searchResult = await dataMapper.searchResultByElement(searchedElement);
      console.log(searchedElement)
      res.render('./searchResults/searchResultElement' , {cards : searchResult, searchedElement })
    } catch(error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
    
  },
  // La méthode pour chercher par niveau: petit hic, quand on appuie sur le bouton chercher dans le field "niveau", ça nous renvoie vers la view searchResultElement. 
  // Solution: j'ai rajouté un paramètre à la route: /search/level/:level
  searchByLevel: async (req, res) => {
    try {
      searchedLevel = Number(req.query.level)
      console.log(searchedLevel)
      searchResult = await dataMapper.searchResultByLevel(searchedLevel);
      res.render('./searchResults/searchResultLevel' , {cards : searchResult, searchedLevel })
    } catch(error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  },
  searchByValue: async(req,res) => {
    try{
      const searchedDirection = req.query.direction
      const searchedValue = Number(req.query.value)
      console.log(searchedValue)
      searchResult = await dataMapper.searchResultByValue(searchedDirection, searchedValue)
      res.render('./searchResults/searchResultValue' , {cards : searchResult, searchedValue, searchedDirection })
    } catch (error){
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  }
};

module.exports = searchController;