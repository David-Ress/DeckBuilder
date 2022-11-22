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
      const title = 'Résultat de la recherche pour le niveau: ' + (`${searchedLevel}`);
      res.render('cardList' , {cards : searchResult, title  })
    } catch(error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  },
  searchByValue: async(req,res) => {
    try{
      const searchedDirection = req.query.direction
      const searchedValue = Number(req.query.value)
      const searchResult = await dataMapper.searchResultByValue(searchedDirection, searchedValue)
      const title = `Résultat de la recherche pour la valeur ${searchedDirection} à au moins ${searchedValue}`;
      res.render('cardList' , {cards : searchResult, searchedValue, searchedDirection, title })
    } catch (error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  },
  searchByName: async(req,res) => {
    const searchedName = req.query.name;
    try{
      const searchResult = await dataMapper.searchResultByName(searchedName);
      const title = `Résultat de la recherches pour les cartes qui contiennent ${searchedName}`
      res.render('cardList' , {cards : searchResult, searchedName, title });
    } catch (error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  }
};

module.exports = searchController;