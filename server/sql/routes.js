const router = require('express').Router();
const controller = require('./controllers/controllers');
const setup = require('./controllers/setup');


//Connect controller methods to their corresponding routes

router.get('/prompts', controller.prompts.get);

router.post('/prompts', controller.prompts.post);


// to drop all tables, and re-initate them
router.get('/dangerwipedatabase', setup.dangerwipedatabase.get);





module.exports = router;
