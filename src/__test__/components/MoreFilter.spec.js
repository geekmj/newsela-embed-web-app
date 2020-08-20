import React from 'react'
import { mount } from 'enzyme';
import MoreFilter from './../../components/morefilter';

describe('Testcase for MoreFilter Component', () => {
    let wrapper;
    let prop ={
        selectedFilter: [
            {
                "filterCategory": "content_maturities",
                "filterItems": ["Upper Elementary School", "Middle School", "High School"]
            },
            {
                "filterCategory": "grade_levels",
                "filterItems": ["3.0"]
            }
        ]
    }

    beforeEach(() => {
        wrapper = mount(<MoreFilter {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    });
    it("testcase for filterContent ",()=>{
        let type ="grade_levels"
        wrapper.instance().filterContent(type)
    });
    it("testcase for filterContent type(content_maturities)",()=>{
        let type ="content_maturities"
        wrapper.instance().filterContent(type);

    });
    it("testcase for isFilterItemSelected ",()=>{
        let category ="grade_levels"
        let items =[]
        wrapper.instance().isFilterItemSelected(category,items) 
    });
    it("testcase for onChange ",()=>{
        let value ="3.0"
        wrapper.instance().onChange (value)
    });
    it("testcase for onChange ",()=>{
        let value ="Election 2020"
        let type ="collection"
        let collectionSelected =["Election 2020","reading-comprehension"]
        wrapper.instance().onChange (value,type)
    })

});