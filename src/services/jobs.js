import axios from "axios";

export const postNewJob = async (options) => {
    try {
        const posted = await axios.post(
            "http://localhost:3000/api/jobs",
            options,
        );
        if (posted) return true;
    } catch (error) {
        return false;
    }
};
