import axios from "axios";
import {
    FAILURE,
    SET_DATA,
    POST_NEW_JOB,
    BID_JOB,
    JOB_COMPLETED,
} from "./actionType";

export const setJobCompleted = (options) => async (dispatch) => {
    try {
        const isUpdated = await axios.put(
            `http://localhost:3000/api/jobs/${options._id}`,
            options,
        );
        if (isUpdated) {
            const jobs = await axios.get("http://localhost:3000/api/jobs");
            dispatch({
                type: SET_DATA,
                payload: jobs.data,
            });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: FAILURE });
    }
};

export const getJobs = (options) => async (dispatch) => {
    const jobs = await axios.get("http://localhost:3000/api/jobs");

    try {
        dispatch({
            type: SET_DATA,
            payload: jobs.data,
        });
    } catch (error) {
        console.error(error);
        dispatch({ type: FAILURE });
    }
};

export const deleteNewJob = (id) => async (dispatch) => {
    try {
        const isDelete = await axios.delete(
            `http://localhost:3000/api/jobs/${id}`,
        );
        if (isDelete) {
            const jobs = await axios.get("http://localhost:3000/api/jobs");
            dispatch({
                type: SET_DATA,
                payload: jobs.data,
            });
        }
    } catch (error) {
        console.error(error);
        dispatch({ type: FAILURE });
    }
};
