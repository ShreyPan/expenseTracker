const UserModel = require("../Models/User");


const addExpenses = async (req, res) => {
    const body = req.body;
    const { _id } = req.user;
    console.log('req.user._id:', req.user._id);
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            {
                $push: {
                    expenses: body
                }
            },
            { new: true }
        );
        console.log('userData:', userData);
        return res.status(200).json({
            message: "Expense Added Successfully",
            data: userData?.expenses,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
}

const fetchExpenses = async (req, res) => {
    const body = req.body;
    const { _id } = req.user;
    console.log('req.user._id:', req.user._id);
    try {
        const userData = await UserModel.findById(_id).select('expenses');
        console.log('userData:', userData);
        return res.status(200).json({
            message: "Fetched Expenses Successfully",
            data: userData?.expenses,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
}

const deleteExpense = async (req, res) => {
    const { _id } = req.user;
    const { expenseId } = req.params;
    console.log('req.user._id:', req.user._id);
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            {
                $pull: {
                    expenses: { _id: expenseId }
                }
            },
            { new: true }
        );
        return res.status(200).json({
            message: "Expense Deleted Successfully",
            data: userData?.expenses,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpense
};