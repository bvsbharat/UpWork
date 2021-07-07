import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJobCompleted } from "../../redux/action";

function clock(endDate) {
    let countDownDate = new Date(endDate).getTime();
    let now = new Date().getTime();
    let timeleft = countDownDate - now;
    const result = [];

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));

    let hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if (days > 0)
        result.push(
            <span>
                {days}
                {" D "}
            </span>,
        );
    if (hours > 0)
        result.push(
            <span>
                {hours} {"H "}
            </span>,
        );
    if (minutes >= 0)
        result.push(
            <span>
                {minutes}
                {" M "}
            </span>,
        );
    if (seconds >= 0)
        result.push(
            <span>
                {seconds} {"S "}
            </span>,
        );

    return result;
}

const Timer = ({ endDate, job, jobCompleted }) => {
    const [timeLef, setTimeLef] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!jobCompleted) {
            const interval = setInterval(() => {
                const diff = clock(endDate);
                if (diff.length > 0) setTimeLef(diff);
                else {
                    dispatch(
                        setJobCompleted({ _id: job._id, jobCompleted: true }),
                    );
                    clearInterval(interval);
                    setTimeLef([]);
                }
            }, [1000]);
            return () => {
                clearInterval(interval);
            };
        }
    }, [timeLef]);

    if (jobCompleted) {
        return "Time is up";
    }

    return <div className="Timer">{timeLef}</div>;
};

Timer.defaultProps = {};

Timer.propTypes = {};

export default Timer;
