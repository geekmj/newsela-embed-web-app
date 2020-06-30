import React from "react";
import { shallow } from 'enzyme'
import App from "./App";
import renderer from "react-test-renderer";
import Routes from '../../Routes'

it('should render app', () => {
    const wrapper = shallow(<App />);
    const routes = wrapper.find(Routes );
    expect(routes.exists()).toBe(true);
});
