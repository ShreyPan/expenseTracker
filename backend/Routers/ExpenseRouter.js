const { fetchExpenses, addExpenses, deleteExpense } = require('../Controllers/ExpenseController');

const router = require('express').Router();

//fetch expenses
router.get('/', fetchExpenses);

//add expenses
router.post('/', addExpenses);

//delete expenses
router.delete('/:expenseId', deleteExpense);


module.exports = router;