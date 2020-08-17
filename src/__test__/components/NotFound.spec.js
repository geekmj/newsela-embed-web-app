import React from 'react'
import { mount } from 'enzyme';
import NotFound from './../../components/notfound';

describe('Testcase for NotFound Component', () => {
    let wrapper;
    let prop ={}
    beforeEach(() => {
        wrapper = mount(<NotFound {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    })

});