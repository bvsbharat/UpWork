import dbConnect from "../../../../util/dbConnect";
import { Jobs } from "../../../../models";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const jobs = await Jobs.find({}).populate("bids");
                return res.status(200).json({ success: true, data: jobs });
            } catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: err.message });
            }
        case "POST":
            try {
                const jobs = new Jobs(req.body);
                await jobs.save();

                return res.status(201).json({ success: true, data: jobs });
            } catch (err) {
                return res
                    .status(400)
                    .json({ success: false, message: err.message });
            }
        default:
            res.status(400).json({ success: false });
            break;
    }

    res.status(200).json(data);
};
