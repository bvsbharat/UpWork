import dbConnect from "../../../../util/dbConnect";
import { Jobs } from "../../../../models";

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const note = await Jobs.findById(id).populate("bids");

                if (!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const note = await Jobs.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "DELETE":
            try {
                const deletedJobs = await Jobs.deleteOne({ _id: id });

                if (!deletedJobs) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
