import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import JobBidForm from "../JobBidForm";

describe(JobBidForm, () => {
    it("Should render correctly", () => {
        const component = renderer.create(<JobBidForm job={[]} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have the correct class name", () => {
        const component = mount(<JobBidForm className="jobBidForm" job={[]} />);
        expect(component.hasClass("jobBidForm")).toBe(true);
    });
});
