import React, { PureComponent } from 'react'
import { set, indexOf, get, isEqual, findIndex, cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./MoreFilter.css"

class MoreFilter extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            filters: [],
            currentSelectedFilter: [],
            isTemp: false
        }
    }

    componentDidMount() {
        let selectedFilter = this.props.selectedFilter;
        let currentSelectedFilter = [];

        selectedFilter && selectedFilter.length > 0 && selectedFilter.map((value, i) => {
            return (
                currentSelectedFilter.push(...value.filterItems)
            )
        })

        this.setState({
            currentSelectedFilter: currentSelectedFilter
        })
    }

    handleArticleSearch(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let filterObject = {};
        let filterItem = [];
        let filterList = [];
        let slugName = "";

        let catArray = []

        this.props.selectedFilter && this.props.selectedFilter.length > 0 && this.props.selectedFilter.map((item, index) => {
            return catArray.push(item.filterCategory)
        })

        for (let name of data.keys()) {
            const [FilterSlug, FilterValue] = data.get(name).split("#");

            if (slugName === "") {
                slugName = FilterSlug
                filterItem.push(FilterValue);
            } else if (slugName !== FilterSlug) {
                set(filterObject, 'filterCategory', slugName);
                set(filterObject, 'filterItems', filterItem);
                slugName = FilterSlug;
                filterList.push(filterObject);
                filterObject = {};
                filterItem = [];
                filterItem.push(FilterValue);
            } else {
                filterItem.push(FilterValue);
            }
            slugName = FilterSlug;
        }
        if (slugName !== "" && this.state.isTemp === true) {
            set(filterObject, 'filterCategory', slugName);
            set(filterObject, 'filterItems', filterItem);
            filterList.push(filterObject);

            let results = filterList.map(({ filterCategory }) => filterCategory)
            let tempArr = []
            for (let i = 0; i < catArray.length; i++) {
                let isExist = results.indexOf(catArray[i])
                if (isExist < 0) {
                    tempArr.push(catArray[i])
                }
            }

            for (let j = 0; j < tempArr.length; j++) {
                let tempObj = {}
                tempObj['filterCategory'] = tempArr[j]
                tempObj['filterItems'] = []
                filterList.push(tempObj)
            }
            this.setState({
                isTemp: false
            })
            this.props.callFilter(filterList, 'moreFilters');
            this.props.setMoreCurrentFilter(this.state.currentSelectedFilter)
            this.props.cancel();
        } else if (this.state.isTemp === false) {
            this.props.cancel();
        }
        else {
            this.props.resetFilter();
            this.props.cancel();
        }
    }


    isFilterItemSelected = (category, item) => {
        const getFilterSelected = this.props.selectedFilter;

        const isFilterCategoryExist = findIndex(getFilterSelected,
            (filter) => {
                return (isEqual(
                    get(filter, 'filterCategory', null),
                    category
                ) && (indexOf(get(filter, 'filterItems', []), item) >= 0));
            });
        return (isFilterCategoryExist > -1) ? true : false;
    }

    onChange = (value, type = '', title = '') => {
        this.setState({
            isTemp: true
        })

        let currentSelectedFilter = cloneDeep(this.state.currentSelectedFilter)
        if (currentSelectedFilter.length > 0) {

            let tempIndex = currentSelectedFilter.indexOf(value)
            if (tempIndex > -1) {
                currentSelectedFilter.splice(tempIndex, 1)
            }

            if (tempIndex <= -1) {
                currentSelectedFilter.push(value)
            }
        } else {
            currentSelectedFilter.push(value)
        }
        this.setState({
            currentSelectedFilter: currentSelectedFilter
        })
    }

    filterContent = (type) => {

        let textLevelContent = ""
        switch (type) {
            case "grade_levels":
                textLevelContent = "Find articles that include a version written at a specific reading level."
                break;
            case "content_maturities":
                textLevelContent = "Find articles Newsela recommends for each age group, based on the subject matter and background knowledge."
                break;
            default:
                break;
        }
        return textLevelContent;

    }

    render() {
        let props = this.props
        const filterList = props.filterList;
        const collectionData = this.props.collectionData;

        return (
            <div className="filter-wrapper" >

                <div className="container-fluid my-4 px-4">
                    <div>
                        <form onSubmit={(event) => this.handleArticleSearch(event)}>
                            <div className="button-group1">
                                <button className="cancel" onClick={props.cancel}>Cancel</button>
                                <button className="apply">Apply</button>
                            </div>
                            <div className="row">

                                {filterList && filterList.length > 0 && filterList.map((filterItem, index) => (

                                    <div className="col-md-6">
                                        <h6 className="pt-2">{filterItem.display_name}</h6>
                                        <div className="more-filer-list">
                                            <p className="px-3">{this.filterContent(filterItem.slug)}</p>
                                            {
                                                filterItem.filters.map((Item, keyItem) => (
                                                    <label>
                                                        {Item.count === 0 ? <span className="cross-icon"><FontAwesomeIcon icon={faTimes} />
                                                        </span> : <input type="checkbox"
                                                            name={`${filterItem.slug}#${keyItem}`}
                                                            value={`${filterItem.slug}#${Item.value}`}
                                                            disabled={!Item.count}
                                                            onChange={() => this.onChange(Item.value)}
                                                            defaultChecked={this.isFilterItemSelected(filterItem.slug, Item.value)}
                                                            />}
                                                        {filterItem.slug === "grade_levels" ? "Grade " : null}
                                                        {Item.display_name} ({Item.count})
                                       </label>
                                                ))
                                            }

                                        </div>
                                    </div>
                                ))}

                                <div className="col-md-6">
                                    <div>
                                        <h6 className="pt-2">From Collections</h6>
                                        <div className="more-filer-list">
                                            <p className="px-3">Find content from your Collections.</p>
                                            {
                                                collectionData && collectionData.length > 0 && collectionData.map((item, index) => {
                                                    return (
                                                        <div>
                                                            <label>
                                                                <input type="checkbox"
                                                                    name={item.title}
                                                                    value={item.id}
                                                                    onChange={() => this.onChange(item.title, 'collection')}
                                                                    checked={this.isFilterItemSelected(item.slug, item.title)}
                                                                />
                                                                {item.title}
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="button-group1">
                                <button className="cancel" onClick={props.cancel}>Cancel</button>
                                <button className="apply" type="submit">Apply</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        )
    }
}

export default MoreFilter