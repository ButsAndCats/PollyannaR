const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const goalController = require('../controllers/goal');
const apiController = require('../controllers/api');
const contactController = require('../controllers/contact');

/**
 * Goal app routes.
 */
 
router.get('/ideas', goalController.getIdeas);
router.get('/ideas-mapper', goalController.getIdeasMapper);
router.get('/new', goalController.newGoal);
router.get('/why', goalController.why);
router.get('/when', goalController.when);
router.get('/complete', goalController.complete);
router.get('/view/:id', goalController.view);

router.post('/report', goalController.report);
router.post('/add', goalController.addGoal);
router.post('/edit', goalController.editGoal);

module.exports = router;
