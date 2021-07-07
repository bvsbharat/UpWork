import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const RouteLinks = ({ routes }) => {
    const renderRouteLinks = () => {
        if (!routes.length) {
            return false;
        }

        return routes.map((item, i) => (
            <li
                key={i}
                className="cursor-pointer h-full flex items-center text-sm text-gry-800 mx-10 tracking-normal"
                aria-current={item.current ? "page" : undefined}
            >
                <Link href={`/${item.href}`}>{item.name}</Link>
            </li>
        ));
    };

    return <>{renderRouteLinks()}</>;
};

RouteLinks.propTypes = {
    routes: PropTypes.array,
};

RouteLinks.defaultProps = {
    routes: [],
};

export default RouteLinks;
