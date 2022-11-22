const { response } = require('express');
const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getAllCards();
      res.render('cardList', {
        cards,
        title: 'Liste des cartes'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  articlePage: async (req, res, next) => {
    try{
      const id = req.params.id
      const card = await dataMapper.getCard(id);
      if (card){
        res.render('cardDetails' , {card : card})
      } else {
        next();
      }
    } catch(error){
      console.trace(error);
      res.status(500).send('Oups, problème technique, repassez plus tard');
    }
  }
};

module.exports = mainController;
