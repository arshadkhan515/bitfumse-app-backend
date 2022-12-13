const User = require('../models/User');
const CategoryController = {
    addCategory: async (req, res) => {
        const { label, icons } = req.body;
        try {
            const newCategory = await User.updateOne({ _id: req.user.id }, { $set: { categories: [...req.user.categories, { label, icon: icons, value: label }] } });
            res.status(200).json({ message: "Add Successfully", data: newCategory });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },

    updateCategory: async (req, res) => {
        const { label, icons } = req.body;
        try {

            const newCategory = await User.updateOne({ _id: req.user.id }, {
                $set: {
                    categories: req.user.categories.map((category) => {
                        if (category._id == req.params.id) {
                            return { value:label,label, icon:icons };
                        }
                        return category;
                    }),
                },
            });
            res.status(200).json({ message: "Add Successfully", data: newCategory });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const newCategory = req.user.categories.filter((category) => category._id != req.params.id);
            console.log(newCategory);
            const deleted = await User.updateOne({ _id: req.user.id }, { $set: { categories: newCategory } });
            res.status(200).json({ message: "Delete Successfully", data: deleted });
        } catch (error) {
            res.status(500).json({ message: error.message, data: [] });
        }
    },
};

module.exports = CategoryController;