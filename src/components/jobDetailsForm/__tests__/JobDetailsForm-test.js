import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import JobDetailsForm from "../JobDetailsForm";

describe(JobDetailsForm, () => {
    it("Should render correctly", () => {
        const component = renderer.create(<JobDetailsForm />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have the correct class name", () => {
        const component = mount(<JobDetailsForm className="jobDetailsForm" />);
        expect(component.hasClass("jobDetailsForm")).toBe(true);
    });
});
