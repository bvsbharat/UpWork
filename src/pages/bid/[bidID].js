import React from "react";
import { Layout, JobBidForm } from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const router = useRouter();
    const { bidID } = router.query;
    const job = useSelector((state) => {
        const result = state.jobs.find((obj) => {
            return obj._id === bidID;
        });

        return result;
    });
    return (
        <Layout>
            {job ? <JobBidForm job={job} id={bidID} /> : "Loading..."}
        </Layout>
    );
}
