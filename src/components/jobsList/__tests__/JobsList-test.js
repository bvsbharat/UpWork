import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import JobsList from "../JobsList";

describe(JobsList, () => {
    it("Should render correctly", () => {
        const component = renderer.create(<JobsList />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have the correct class name", () => {
        const component = mount(<JobsList className="jobsList" />);
        expect(component.hasClass("jobsList")).toBe(true);
    });
});
