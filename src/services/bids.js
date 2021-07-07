import axios from "axios";

export const postBid = async (options) => {
    try {
        const posted = await axios.post(
            "http://localhost:3000/api/bids",
            options,
        );
        if (posted) return true;
    } catch (error) {
        return false;
    }
};
