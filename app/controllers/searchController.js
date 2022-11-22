const dataMapper = require('../dataMapper.js');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  // la méthode pour chercher par élément
  searchByElement: async (req, res) => {
    const element = req.query.element;
    dataMapper.searchResultByElement(element, (error, cards) => {
        if (error) {
            res.status(500).send('error');
        } else {
            const title = 'Liste des cartes ' + (element === 'null' ? ' sans élément' : `d'élement ${element}`);
            res.render('cardList', {
                cards,
                title
            });
        }
    });
    
    try {
      const element = req.query.element;
      const cards = await dataMapper.searchResultByElement(element);
      const title = 'Résultat de la recherche par élément: ' + (element === 'null' ? ' sans élément' : `d'élement ${element}`);
      res.render('cardList', {
        cards,
        title
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('error');
    }
},

  // La méthode pour chercher par niveau: petit hic, quand on appuie sur le bouton chercher dans le field "niveau", ça nous renvoie vers la view searchResultElement. 
  // Solution: j'ai rajouté un paramètre à la route: /search/level/:level
  searchByLevel: async (req, res) => {
    try {
      const searchedLevel = Number(req.query.level)
      console.log(searchedLevel)
      const searchResult = await dataMapper.searchResultByLevel(searchedLevel);
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
  },
  searchByName: async(req,res) => {
    const searchedName = req.query.name;
    try{
      const searchResult = await dataMapper.searchResultByName(searchedName);
      res.render('./searchResults/searchResultName' , {cards : searchResult, searchedName });
    } catch (error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  }
};

module.exports = searchController;