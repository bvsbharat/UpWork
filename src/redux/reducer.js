import _ from "underscore";
import { HYDRATE } from "next-redux-wrapper";
import {
    SET_DATA,
    FAILURE,
    POST_NEW_JOB,
    BID_JOB,
    JOB_COMPLETED,
} from "./actionType";

const initialState = {
    jobs: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const nextState = {
                ...state,
                ...action.payload,
            };
            if (state.count) nextState.count = state.count;
            return nextState;
        case SET_DATA: {
            return {
                ...state,
                jobs: action.payload.data,
                error: false,
            };
        }
        case POST_NEW_JOB: {
            const jobs = [...state.jobs, { ...action.payload, bids: [] }];
            return {
                ...state,
                jobs: jobs,
                error: false,
            };
        }
        case BID_JOB: {
            let jobs = [...state.jobs];

            jobs[action.payload.jobID].bids.push(action.payload.bid);

            return {
                ...state,
                jobs: jobs,
                error: false,
            };
        }

        case JOB_COMPLETED: {
            let jobs = [...state.jobs];

            jobs[action.payload.jobID].jobCompleted =
                action.payload.jobCompleted;

            return {
                ...state,
                jobs: jobs,
                error: false,
            };
        }
        case FAILURE:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default reducer;
