import React from 'react'
import { mount } from 'enzyme';
import Searchbar from './../../components/searchbar';
describe("Searchbar component", () => {
    let wrapper;
    let prop = {
        updateValue: jest.fn(),
        searchAndSave: jest.fn(),
        jsonData: [{
            "content_id": "ckbl431d80aiaa4mavuhrunnf",
            "date_published": "2020-06-18T18:22:17+00:00",
            "display_category": "Kids",
            "id": 2000000332,
            "image": "https://nails.newsela.com/s3/newsela-media-dev/article_media/test-images/2000000332.jpg?crop=0%2C0%2C1366%2C825&height=282&horizontal_focal_point=center&vertical_focal_point=center&width=467",
            "license_tier": "free",
            "title": "Produce watch worry machine thousand, Grade 12"
        }]
    }


    beforeEach(() => {
        wrapper = mount(<Searchbar {...prop} />);
    });

    it("testcase for handleOnInputChange", () => {
        let event = {
            charCode: 13,
            target: {
                value: "testJob",
                id: "search"
            }
        }
        wrapper.find('#search').simulate('change', event);
        wrapper.instance().handleOnInputChange(event);
        expect(wrapper.instance().state.searchKey).toEqual('testJob');
    });
    it("testcase for handleOnInputChange (else case for charCode)", () => {
        let event = {
            charCode: 10,
            target: {
                value: "testJob",
                id: "search"
            }
        }
        wrapper.find('#search').simulate('change', event);
        wrapper.instance().handleOnInputChange(event);
        expect(wrapper.instance().state.searchKey).toEqual('testJob');
    });
    it("testcase for filterbasedonsearchkey", () => {
        let searchKey = ""
        wrapper.instance().filterBasedOnSearchKey(searchKey);
        expect(wrapper.instance().state.searchKey).toEqual('');
    });

    it("testcase for searchWord", () => {
        wrapper.instance().searchWord();
    });

})
