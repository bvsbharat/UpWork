import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postNewJob } from "../../services/jobs";

const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const schema = yup.object().shape({
    jobDetails: yup.string().required("Job Description is required"),
    requirement: yup.string().required("Requirement is required"),
    name: yup.string().required("Name is required"),
    contact: yup
        .string()
        .required("Phone Number is required")
        .matches(phoneRegExp, "Phone number is not valid"),
    endDate: yup.string().required("Expiration Date is required"),
});

const JobDetailsForm = (props) => {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const jobs = useSelector((state) => state.jobs);
    const router = useRouter();
    const onSubmit = async (data) => {
        setSubmitted(true);
        const completed = await postNewJob(data);
        if (completed) {
            router.push("/dashboard");
        }
        setSubmitted(false);
    };

    const minDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate());
        const activeDate = new Date(tomorrow).toJSON().slice(0, 10);
        return activeDate;
    };

    return (
        <div className="relative">
            <img
                src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
            />
            <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                <svg
                    className="absolute inset-x-0 bottom-0 text-white"
                    viewBox="0 0 1160 163"
                >
                    <path
                        fill="currentColor"
                        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                    />
                </svg>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-10 xl:w-4/12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                Join the world's
                                <br className="hidden md:block" />
                                work marketplace
                            </h2>
                            <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                                Find great talent. Build your business.
                                <br />
                                Take your career to the next level.
                            </p>
                            <a
                                href="/"
                                aria-label=""
                                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
                            >
                                Learn more
                                <svg
                                    className="inline-block w-3 ml-2"
                                    fill="currentColor"
                                    viewBox="0 0 12 12"
                                >
                                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                </svg>
                            </a>
                        </div>
                        <div className="w-full max-w-xl xl:px-8 xl:w-10/12">
                            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                    Please provide the "Job details"
                                </h3>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    autoComplete="off"
                                    noValidate
                                >
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="jobDetails"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Job Description
                                        </label>
                                        <textarea
                                            placeholder="some job details "
                                            required
                                            type="text"
                                            className="flex-grow w-full h-16 px-4 py-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="jobDetails"
                                            name="jobDetails"
                                            {...register("jobDetails")}
                                            rows="8"
                                        />
                                        <p className="text-red-600 text-xs">
                                            {errors.jobDetails?.message}
                                        </p>
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="requirement"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Requirement
                                        </label>
                                        <textarea
                                            placeholder="Job requirement"
                                            required
                                            type="text"
                                            className="flex-grow w-full h-16 px-4 py-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="requirement"
                                            {...register("requirement")}
                                            name="requirement"
                                        />
                                        <p className="text-red-600 text-xs">
                                            {errors.requirement?.message}
                                        </p>
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="name"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Name
                                        </label>
                                        <input
                                            placeholder="john.doe"
                                            required
                                            type="text"
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="name"
                                            name="name"
                                            {...register("name")}
                                        />
                                        <p className="text-red-600 text-xs">
                                            {errors.name?.message}
                                        </p>
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="contact"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            placeholder="+12246598896"
                                            required
                                            type="text"
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="contact"
                                            name="contact"
                                            {...register("contact")}
                                        />
                                        <p className="text-red-600 text-xs">
                                            {errors.contact?.message}
                                        </p>
                                    </div>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="date"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Expiration Date
                                        </label>
                                        <input
                                            placeholder="+12246598896"
                                            required
                                            type="datetime-local"
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="date"
                                            name="contact"
                                            {...register("endDate")}
                                            min={`${minDate()}T00:00`}
                                            max="2028-11-01T00:00"
                                        ></input>
                                        <p className="text-red-600 text-xs">
                                            {errors.endDate?.message}
                                        </p>
                                    </div>
                                    <div className="mt-4 mb-2 sm:mb-4">
                                        <input
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                            disabled={submitted}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 sm:text-sm">
                                        We respect your privacy.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobDetailsForm.defaultProps = {};

JobDetailsForm.propTypes = {};

export default JobDetailsForm;
