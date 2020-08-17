import React from 'react'
import { mount, shallow } from 'enzyme';
import DropDown from './../../components/dropdown';

describe('Testcase for DropDown Component', () => {
    let wrapper;
    let prop = {
        selectedType:jest.fn(),
        itemData:{
            '@context': 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
            '@graph': [
                {
                    '@type': 'ContentItem',
                    url: 'undefined/read/kitchen-sink',
                    mediaType: 'text/html',
                    thumbnail: [
                        Object
                    ],
                    title: 'Produce watch worry machine thousand, Grade 12',
                    placementAdvice: [
                        Object
                    ]
                }
            ]
        }
    }

    beforeEach(() => {
        document = {
            ...document,
            addEventListener: () => { },
            removeEventListener: () => { }
        }
        wrapper = mount(<DropDown {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    });

    it("testcase for componentDidMount", () => {
        const spy = jest.spyOn(DropDown.prototype, 'componentDidMount');
        const wrapper = mount(<DropDown {...prop} />);
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        const map = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        expect(wrapper.instance().state.option).toBe(false)
    });

    it("Testcase for handleChange", () => {
        let e = {
            target: {
                getAttribute: jest.fn()
            }
        }
        wrapper.instance().handleChange(e)
        expect(wrapper.instance().state.option).toBe(true)
    });
    it("Testcase for handleClick",()=>{
        wrapper.instance().handleClick();
        expect(wrapper.instance().state.option).toBe(true)
    })

});