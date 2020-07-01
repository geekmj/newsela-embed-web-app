import React from "react";
import { shallow } from 'enzyme'
import App from "./App";
import Routes from '../../routes'

it('should render app', () => {
    const wrapper = shallow(<App />);
    const routes = wrapper.find(Routes );
    expect(routes.exists()).toBe(true);
});

