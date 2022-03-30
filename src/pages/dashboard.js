import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteNewJob } from "../redux/action";
import { Layout, JobsList, Header, ActiveJobs } from "../components";
import { server } from "../config";


export default function Dashboard({ jobs }) {

    const getActiveJobs = (jobList) => {
        return jobList.sort((a, b) => b.bids.length - a.bids.length);
    };

    const handleDelete = (id) => {
        console.log(id);
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



export async function  getStaticProps() {
    const jobs = await fetch(`${server}/api/jobs`).then(res => res.json());
    return {
        props: {
            jobs: jobs.data,
        },
        revalidate: 1000, // In seconds
    };
}

