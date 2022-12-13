const Transaction = require('../models/Transaction');
const TransactionController = {
    addTransaction: async (req, res) => {
        try {
            const { amount, title, date, category_id } = req.body;
            const newTransaction = new Transaction({
                amount,
                title,
                date,
                user_id: req.user._id,
                category_id
            });
            await newTransaction.save();
            res.status(200).json({ message: 'Add Successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTransactions: async (req, res) => {
        try {
            const transactions = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });
            res.status(200).json({ message: "Success", data: transactions });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },
    getTransactionsChart: async (req, res) => {
        try {
            const demo = await Transaction.aggregate([
                {
                    $match: { user_id: req.user._id },
                },
                {
                    $group: {
                        _id: { $month: "$date" },
                        transactions: { $push: { amount: "$amount", description: "$description", date: "$date" } },
                        totalExpenses: { $sum: "$amount" },
                    }
                },
                { $sort: { _id: 1 } },
            ])
            res.status(200).json({ message: "Success", data: demo });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },
    deleteTransaction: async (req, res) => {
        try {
            const deleted = await Transaction.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Delete Successfully", data: deleted });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },
    updateTransaction: async (req, res) => {
        try {
            const { amount, title, date, category_id } = req.body;
            const updated = await Transaction.updateOne({ _id: req.params.id }, { amount, title, date, category_id });
            res.status(200).json({ message: "Update Successfully", data: updated });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    }
};

module.exports = TransactionController;