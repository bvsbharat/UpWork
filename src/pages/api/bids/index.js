import dbConnect from "../../../../util/dbConnect";
import { Bids, Jobs } from "../../../../models";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const jobs = await Bids.find({});
                return res.status(200).json({ success: true, data: jobs });
            } catch (err) {
                return res.status(400).json({ success: false });
            }
        case "POST":
            try {
                const bid = new Bids(req.body);
                await bid.save();

                const job = await Jobs.findById({ _id: bid.job });
                console.log("job", job);
                job.bids.push(bid);
                await job.save();

                //return new book object, after saving it to Publisher
                return res.status(200).json({ success: true, data: bid });
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
