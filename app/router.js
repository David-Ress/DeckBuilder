const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
router.get ('/card/:id', mainController.articlePage);

//page recherche
router.get('/search', searchController.searchPage);
router.get('/search/element/:element', searchController.searchByElement);
router.get('/search/level/:level', searchController.searchByLevel);
router.get('/search/values/:value', searchController.searchByValue);

//page deck
router.get('/deck', deckController.deckPage);
router.post('/deck/add/:id', deckController.addCardToDeck);
router.post ('/deck/remove/:id', deckController.removeCardFromDeck);


module.exports = router;