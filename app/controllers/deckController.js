const { request } = require('express');
const dataMapper = require ('../dataMapper');

const deckController = {
  deckPage: async (req, res, next) => {
    res.render('deckMain', {cards : req.session.deck})
  },
  addCardToDeck: async (req, res, next) => {
    try {

      if(req.session.deck.length <=5) {

      
        const id = Number(req.params.id);
        const card = await dataMapper.getCard(id);
        if (card){
          const findCardInDeck = req.session.deck.find((deck) => deck.id === id);
            if(!findCardInDeck){
              req.session.deck.push(card);
            }
            res.redirect('/')
        } else {
          next()
        }
    } else {
      res.redirect('/')
    }

    } catch(error){
      res.status(500).send('une erreur s\'est produite.');
    }
  },
}

module.exports = deckController;