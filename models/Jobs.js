import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
    jobDetails: { type: String, required: "{PATH} is required!" },
    requirement: { type: String, required: "{PATH} is required!" },
    name: { type: String, required: "{PATH} is required!" },
    contact: { type: String, required: "{PATH} is required!" },
    endDate: { type: String, required: "{PATH} is required!" },
    jobCompleted: { type: Boolean },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bids" }],
});

module.exports = mongoose.models.Jobs || mongoose.model("Jobs", JobsSchema);
