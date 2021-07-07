import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteNewJob } from "../redux/action";
import { Layout, JobsList, Header, ActiveJobs } from "../components";

export default function Dashboard() {
    const dispatch = useDispatch();

    const jobs = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getJobs());
        console.log("feached");
    }, []);

    const getActiveJobs = (jobList) => {
        return jobList.sort((a, b) => b.bids.length - a.bids.length);
    };

    const handleDelete = (id) => {
        dispatch(deleteNewJob(id));
    };

    return (
        <Layout>
            <div className="bg-white">
                <Header />
                {jobs.length ? (
                    <>
                        <ActiveJobs jobs={getActiveJobs(jobs)} />
                        <JobsList jobs={jobs} handleDelete={handleDelete} />
                    </>
                ) : (
                    <h2 className="p-20 text-center font-bold">
                        No active jobs available...
                    </h2>
                )}
            </div>
        </Layout>
    );
}
