import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Header from "../Header";

describe(Header, () => {
    it("Should render correctly", () => {
        const component = renderer.create(<Header />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should have the correct class name", () => {
        const component = mount(<Header className="header" />);
        expect(component.hasClass("header")).toBe(true);
    });
});
