import React from "react";
import PropTypes from "prop-types";
import styles from "./ActiveJobs.module.scss";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/solid";
import moment from "moment";

const ActiveJobs = ({ jobs }) => {
    const formatDateTime = (date) => {
        const format1 = "YYYY-MM-DD";
        var date1 = new Date(date);
        return moment(date1).format(format1);
    };

    const renderActiveJobs = () => {
        console.log(jobs);

        return jobs.map((job, i) => {
            if (i < 10 && !job.jobCompleted && job.bids.length > 0)
                return (
                    <div
                        className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl relative"
                        key={i}
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-deep-purple-accent-700 absolute right-2 bottom-0">
                                <div
                                    className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-white-400 hover:border-deep-purple-accent-400 hover:shadow hover:scale-110"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <h1 className="p-1 px-3 font-bold ">
                                        {job.bids.length}{" "}
                                    </h1>
                                </div>
                            </div>
                            <p className="mb-2 font-bold  sm:truncate">
                                <Link href={`/bid/${i}`}>{job.jobDetails}</Link>
                            </p>
                            <p className="text-sm leading-5 text-gray-900 max-h-24 mb-4 overflow-clip overflow-hidden">
                                {job.requirement}
                            </p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <ClockIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                Ends @ {formatDateTime(job.endDate)}{" "}
                            </div>
                        </div>
                        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                    </div>
                );
        });
    };

    return (
        <div className="bg-white">
            <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none py-10 e text-center">
                Trending Jobs
            </h2>

            <div className="bg-gray-100">
                <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
                        <svg
                            viewBox="0 0 88 88"
                            className="w-full max-w-screen-xl text-indigo-100"
                        >
                            <circle
                                fill="currentColor"
                                cx="44"
                                cy="44"
                                r="15.5"
                            />
                            <circle
                                fillOpacity="0.2"
                                fill="currentColor"
                                cx="44"
                                cy="44"
                                r="44"
                            />
                            <circle
                                fillOpacity="0.2"
                                fill="currentColor"
                                cx="44"
                                cy="44"
                                r="37.5"
                            />
                            <circle
                                fillOpacity="0.3"
                                fill="currentColor"
                                cx="44"
                                cy="44"
                                r="29.5"
                            />
                            <circle
                                fillOpacity="0.3"
                                fill="currentColor"
                                cx="44"
                                cy="44"
                                r="22.5"
                            />
                        </svg>
                    </div>

                    <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {renderActiveJobs()}
                    </div>
                </div>
            </div>
        </div>
    );
};

ActiveJobs.defaultProps = {};

ActiveJobs.propTypes = {};

export default ActiveJobs;
