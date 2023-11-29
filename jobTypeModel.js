const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const jobTypeSchema = new Schema({
    jobTypeName: {
        type: String,
        trim: true,
        required: [true, 'Job category is required'],
        maxlength: 70,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

module.exports = model("JobType", jobTypeSchema);
