import { useState } from "react";
import JobsList from "../jobsList";
import PropTypes from "prop-types";
import styles from "./JobBidForm.module.scss";
import { useDispatch } from "react-redux";
import { postBid } from "../../services/bids";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const schema = yup.object().shape({
    value: yup
        .number("Please provide a valid number as value")
        .required("Phone Number is required"),
    contact: yup
        .string()
        .required("Phone Number is required")
        .matches(phoneRegExp, "Phone number is not valid"),
});

const JobBidForm = (props) => {
    const { job, id } = props;
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setSubmitted(true);
        const payload = { job: id, ...data };
        await postBid(payload);
        router.push("/dashboard");
        setSubmitted(false);
    };

    const renderBidForm = () => {
        return (
            <div className="mx-auto rounded shadow-md sm:max-w-xl md:max-w-full lg:max-w-screen-xl my-4 p-10 py-20 sm:p-8 bg-white">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="px-4 sm:px-0">
                        <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none ">
                            Please provide the bid information
                        </h2>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                        noValidate
                    >
                        <div className="sm:overflow-hidden grid sm:grid-cols-2 lg:grid-cols-3">
                            <div className="px-4 py-2 space-y-6 sm:p-6">
                                <label
                                    htmlFor="value"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Bid Value
                                </label>
                                <div className="mt-1 flex rounded-md">
                                    <input
                                        type="number"
                                        name="value"
                                        id="value"
                                        className="flex-grow w-full h-12 px-4 py-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded  appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                        {...register("value")}
                                    />
                                </div>
                                <p className="text-red-600 text-xs">
                                    {errors.value?.message}
                                </p>
                            </div>
                            <div className="px-4 py-2 space-y-6 sm:p-6 grid">
                                <label
                                    htmlFor="contact"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <div className="mt-1 flex rounded-md">
                                    <input
                                        type="text"
                                        name="contact"
                                        id="contact"
                                        className="flex-grow w-full h-12 px-4 py-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded  appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                        {...register("contact")}
                                    />
                                </div>
                                <p className="text-red-600 text-xs">
                                    {errors.contact?.message}
                                </p>
                            </div>
                            <div className="px-4 pt-16 space-y-6  sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                    disabled={submitted}
                                >
                                    submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="JobBidForm bg-white my-10 py-10">
            <JobsList jobs={[job]} hideTitleBid />
            {renderBidForm()}
        </div>
    );
};

JobBidForm.defaultProps = {};

JobBidForm.propTypes = {};

export default JobBidForm;
