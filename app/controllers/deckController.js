const { request } = require('express');
const dataMapper = require ('../dataMapper');

const deckController = {
  //Page de présentation du deck:
  deckPage: async (req, res, next) => {
    res.render('deckMain', {cards : req.session.deck})
  },
  //Ajout au deck:
  addCardToDeck: async (req, res, next) => {
    const id = req.params.id;
    const findCardInDeck = req.session.deck.find((deck) => deck.id === id);
    if (findCardInDeck){
      res.redirect('/deck');
    } else {

        if(req.session.deck.length <=5) {
        try {

        
        const card = await dataMapper.getCard(id);

          if (card){

              if(!findCardInDeck){
                req.session.deck.push(card);
                res.redirect('/');
              }
          } else {
            res.status(404).send(`Card with id ${id} not found`);
          }
      } catch (error){
        console.error(error);
        
      res.status(500).send('Oups, problème technique, repassez plus tard');
      }
    }
  }
},
//Suppression du deck:
  removeCardFromDeck: async (req, res, next) => {
    const id = Number(req.params.id)
    if (req.session.deck){
      req.session.deck = req.session.deck.filter((deck) => deck.id !==id)
    }
    res.redirect('/deck');
  }
}

module.exports = deckController;