const { fetchExpenses, addExpenses, deleteExpense } = require('../Controllers/ExpenseController');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();

//fetch expenses
router.get('/', ensureAuthenticated, fetchExpenses);

//add expenses
router.post('/', ensureAuthenticated, addExpenses);

//delete expenses
router.delete('/:expenseId', ensureAuthenticated, deleteExpense);


module.exports = router;