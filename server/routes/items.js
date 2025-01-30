// server/routes/items.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// GET /api/items?q=:query
router.get('/', itemsController.getItemsByQuery);

// GET /api/items/:id
router.get('/:id', itemsController.getItemById);

module.exports = router;
