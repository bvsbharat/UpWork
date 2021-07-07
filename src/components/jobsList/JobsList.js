import React from "react";
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    ClockIcon,
    HandIcon,
    GiftIcon,
} from "@heroicons/react/solid";

import PropTypes from "prop-types";
import styles from "./JobsList.module.scss";

import Timer from "../timer/Timer";
import moment from "moment";
import { useRouter } from "next/router";

const JobsList = ({ jobs = [], hideTitleBid = false, handleDelete }) => {
    const router = useRouter();

    const formatDateTime = (date) => {
        const format1 = "YYYY-MM-DD HH:mm:ss";
        var date1 = new Date(date);
        return moment(date1).format(format1);
    };

    const renderLowestBidAmount = (bids = [], key) => {
        if (!bids.length) return "N/A";

        let lowestIndex = 0;

        console.log(bids, "bids");

        bids.forEach((item, index) => {
            if (bids[lowestIndex].value > item.value) lowestIndex = index;
        });

        return bids[lowestIndex][key];
    };

    return (
        <div className="bg-white px-10 py-10">
            {!hideTitleBid && (
                <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none py-10 e text-center">
                    React Jobs
                </h2>
            )}
            {jobs.length > 0 &&
                jobs.map((job, index) => (
                    <div
                        className="mx-auto rounded shadow-md sm:max-w-xl md:max-w-full lg:max-w-screen-xl my-4 p-10 py-20 sm:p-8 bg-white"
                        key={index}
                    >
                        <div className="flex flex-col lg:flex-row">
                            <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
                                <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                    {job.jobDetails}
                                </h2>
                            </div>
                            <div className="lg:w-1/2">
                                <p className="mb-4 text-base text-gray-700">
                                    {job.requirement}
                                </p>
                                {/* {!hideTitleBid && !job.jobCompleted && ( */}
                                <>
                                    <button
                                        type="button"
                                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                        onClick={() => {
                                            router.push(`/bid/${job._id}`);
                                        }}
                                    >
                                        Submit proposal
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                        onClick={() => {
                                            handleDelete(job._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </>
                                {/* )} */}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <HandIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                Total Bids:
                                {job?.bids && job?.bids.length
                                    ? job.bids.length
                                    : 0}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CurrencyDollarIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                Low bid:
                                {renderLowestBidAmount(job.bids, "value")}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                Closing on {formatDateTime(job.endDate)}{" "}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <ClockIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <Timer
                                    endDate={job.endDate}
                                    job={job}
                                    key={index}
                                    jobCompleted={job.jobCompleted}
                                />
                            </div>

                            {job.jobCompleted && (
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <GiftIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    Winner :{" "}
                                    {renderLowestBidAmount(job.bids, "contact")}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

JobsList.defaultProps = {};

JobsList.propTypes = {};

export default JobsList;
