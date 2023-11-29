const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// Load all users
exports.allUsers = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const count = await User.countDocuments();

        const users = await User.find()
            .sort({ createdAt: -1 })
            .select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
};

// Show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        next(error);
    }
};

// Jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findById(req.user._id);
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        }

        const addJobHistory = {
            title,
            description,
            salary,
            location,
            user: req.user._id
        };

        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();

        res.status(200).json({
            success: true,
            currentUser
        });
    } catch (error) {
        next(error);
    }
};
