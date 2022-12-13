const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const TransactionController = require('../controllers/TransactionController');
const router = express.Router();

// Transaction Routes
router.post('/transaction/add',TransactionController.addTransaction);
router.get('/transaction/get',TransactionController.getTransactions);
router.get('/transactionChart/get',TransactionController.getTransactionsChart);
router.delete('/transaction/delete/:id',TransactionController.deleteTransaction);
router.put('/transaction/update/:id',TransactionController.updateTransaction);

// Category Routes
router.delete('/category/delete/:id',CategoryController.deleteCategory);
router.post('/category/add',CategoryController.addCategory);
router.put('/category/update/:id',CategoryController.updateCategory);
module.exports = router