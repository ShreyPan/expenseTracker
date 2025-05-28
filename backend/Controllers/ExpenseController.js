

const addExpenses = (req, res) => {
    const body = req.body;
    const { _id } = req.user;

}

const fetchExpenses = (req, res) => {
    res.send('Fetch Expenses');
}

const deleteExpense = (req, res) => {
    res.send('Delete Expense');
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpense
};