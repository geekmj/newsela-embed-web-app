import React from 'react'
import { mount } from 'enzyme';
import Filter from './../../components/filter';

describe('Testcase for Filter Component', () => {
    let wrapper;
    let props = {
        filterlist: [{
            "display_name": "Suggested For",
            "display_order": 1,
            "filter_type": "content_maturities",
            "filters": [{
                "count": 0,
                "display_name": "Lower Elementary School",
                "value": "Lower Elementary School"
            },
            {
                "count": 127,
                "display_name": "Upper Elementary School",
                "value": "Upper Elementary School"
            },
            {
                "count": 127,
                "display_name": "Middle School",
                "value": "Middle School"
            },
            {
                "count": 127,
                "display_name": "High School",
                "value": "High School"
            },
            ],
            "slug": "content_maturities",

            "sorted": true
        },
        {
            "display_name": "Text Level",
            "display_order": 2,
            "filter_type": "grade_levels",
            "filters": [],
            "slug": "grade_levels",
            "sorted": true
        },

        ],
        moreCurrentFilter: ["3.0", "5.0", "Middle School"],
        resetFilter:jest.fn(),
        isMoreFilter: "Filters",
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

    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
    });

    beforeEach(() => {
        wrapper = mount(<Filter {...props} />);
    });

    it("render without crashing", () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    })
    it("testcase for componentDidMount", () => {

        const spy = jest.spyOn(Filter.prototype, 'componentDidMount');
        const wrapper = mount(<Filter {...props} />);
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        map.click({
            target: <div />
        })
        wrapper.instance().state.option1 = false
        wrapper.instance().state.filterMenuId = 0

    });
    it("testcase for componentWillUnmount", () => {
        wrapper.instance().componentWillUnmount()
    });
    it("Component should call componentWillReceiveProps on update", () => {
        let props = {
            isMoreFilter: "moreFilters"
        }
        let nextProps = {
            moreCurrentFilter: ["3.0", "5.0", "Middle School"]
        }
        const spy = jest.spyOn(Filter.prototype, "componentWillReceiveProps");
        const wrapper = mount(<Filter {...props} />);
        wrapper.instance().componentWillReceiveProps(nextProps);
        expect(spy).toHaveBeenCalled();
    });
    it("Component should call componentWillReceiveProps on update (else case)", () => {
        let nextProps = {
            moreCurrentFilter: ["3.0", "5.0", "Middle School"]
        }
        const spy = jest.spyOn(Filter.prototype, "componentWillReceiveProps");
        const wrapper = mount(<Filter {...props} />);
        wrapper.instance().componentWillReceiveProps(nextProps);
        expect(spy).toHaveBeenCalled();
    });

    it("testcase for handleOpenOptions", () => {
        wrapper.instance().handleOpenOptions();
        expect(wrapper.instance().state.option1).toBe(true);
        expect(wrapper.instance().state.filterMenuId).toBe(0)
    });

    it("testcase for handleFilterMenu", () => {
        let id = 1
        wrapper.instance().handleFilterMenu(id);
        expect(wrapper.instance().state.option1).toBe(false);
        expect(wrapper.instance().state.filterMenuId).toBe(1)
    });

    it("testcase for closeOption", () => {
        wrapper.instance().closeOption();
        expect(wrapper.instance().state.option1).toBe(false);
        expect(wrapper.instance().state.filterMenuId).toBe(0)
    });
    xit("testcase for handleArticleSearch", () => {
        let event = {
            target: {},
            preventDefault:jest.fn()
        }
        let searchType = "collection_id"
        function FormDataMock() {
            this.append = jest.fn();
          }
        global.FormData = FormDataMock
        wrapper.instance().handleArticleSearch(event, searchType);

    });
    it("testcase for clearAll",()=>{
       wrapper.instance().clearAll();
       expect( wrapper.instance().state.formCollectionName).toBe("Form Collection");
       expect( wrapper.instance().state.filterClassName).toBe("filterbutton  dropdown-toggle")
    });
    it("testcase for isFilterItemSelected ",()=>{
        let category ="grade_levels"
        let items =[]
        wrapper.instance().isFilterItemSelected(category,items) 
    });
    it("testcase for isMoreFilterItemExist ",()=>{
        let filterCategory ="grade_levels"
        wrapper.instance().isMoreFilterItemExist();
    });
    it("testcase for filterContent ",()=>{
        let type ="grade_levels"
        wrapper.instance().filterContent(type)
    });
    it("testcase for filterContent type(content_maturities)",()=>{
        let type ="content_maturities"
        wrapper.instance().filterContent(type);

    });
    it("testcase for renderCollectionDisplayName ",()=>{
        let collectionSelected =["Election 2020"];
        let collectionDisplayName ="Election 2020"
        wrapper.instance().renderCollectionDisplayName();
    });
    it("testcase for renderCollectionDisplayName ",()=>{
        let collectionSelected =["Election 2020","reading-comprehension"]
        wrapper.instance().renderCollectionDisplayName();
    });
    it("testcase for renderDisplayName ",()=>{
        wrapper.instance().renderDisplayName ("Suggested for","content_maturities")
    });
    it("testcase for renderDisplayName else case ",()=>{
        wrapper.setProps({
            selectedFilter: [
                {
                    "filterCategory": "grade_levels",
                    "filterItems": ["3.0"]
                }
            ]
        })
        wrapper.instance().renderDisplayName ("Suggested for","content_maturities")
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
