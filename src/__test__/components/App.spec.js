import React from 'react'
import { mount } from 'enzyme';
import App from './../../components/app';

describe('Testcase for App Component', () => {
    let wrapper;
    let prop ={}
    beforeEach(() => {
        wrapper = mount(<App {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    })

});