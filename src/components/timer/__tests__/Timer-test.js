import mount from "@test";
import renderer from "react-test-renderer";
import Timer from '../Timer';

describe(Timer, () => {

   it("renders without crashing", () => {
        const componentRender = renderer.create(<Timer />);
        const tree = componentRender.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
