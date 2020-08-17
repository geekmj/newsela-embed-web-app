import React from 'react'
import { mount } from 'enzyme';
import Loader from './../../components/loader';

describe('Testcase for Loader Component', () => {
    let wrapper;
    let prop ={
        type:"showMore"
    }
    beforeEach(() => {
        wrapper = mount(<Loader {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    })

});