const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
router.get ('/card/:id', mainController.articlePage);

//page recherche
router.get('/search', searchController.searchPage);
router.get('/search/element', searchController.searchByElement);
router.get('/search/level', searchController.searchByLevel);
router.get('/search/values', searchController.searchByValue);
router.get('/search/name', searchController.searchByName);

//page deck
router.get('/deck', deckController.deckPage);
router.get('/deck/add/:id', deckController.addCardToDeck);
router.get ('/deck/remove/:id', deckController.removeCardFromDeck);


module.exports = router;