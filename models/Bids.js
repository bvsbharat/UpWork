import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    contact: { type: String, required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs", required: true },
});

module.exports = mongoose.models.Bids || mongoose.model("Bids", BidSchema);
