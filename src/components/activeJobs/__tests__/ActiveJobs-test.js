import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import ActiveJobs from "../ActiveJobs";

describe(ActiveJobs, () => {
    it("Should render correctly", () => {
        const component = renderer.create(<ActiveJobs jobs={[]} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have the correct class name", () => {
        const component = mount(
            <ActiveJobs className="activeJobs" jobs={[]} />,
        );
        expect(component.hasClass("activeJobs")).toBe(true);
    });
});
