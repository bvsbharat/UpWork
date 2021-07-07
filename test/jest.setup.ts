import "isomorphic-unfetch";
import nock from "nock";
import dotenv from "dotenv";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import httpAdapter from "axios/lib/adapters/http";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

dotenv.config({ path: ".env.test" });

axios.defaults.adapter = httpAdapter;

Enzyme.configure({ adapter: new Adapter() });

afterAll(() => {
    nock.cleanAll();
    nock.restore();
});

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
});

window.scroll = jest.fn();
window.alert = jest.fn();
