import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const A = (props) => {
    const [state, setState] = useState("initialState");

    return (
        <div className="a">
            <p>A Page</p>
        </div>
    );
};

export default A;
