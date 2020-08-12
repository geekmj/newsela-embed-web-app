import React, { PureComponent } from 'react';
import { set, indexOf, get, isEqual, findIndex, cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Filter.css';

export class Filter extends PureComponent {
    state = {
        option1: false,
        filterMenuId: 0,
        collectionData: [],
        checked: false,
        currentSelectedFilter: [],
        tempFilters: [],
        collectionSelected: [],
        formCollectionName: 'Form Collection',
        filterClassName: "filterbutton  dropdown-toggle",
        catArray: []
    }

    componentDidMount() {
        window.addEventListener("click", event => {
            if ((this.state.option1 && !this.node.contains(event.target)) || (this.state.filterMenuId && !this.node.contains(event.target))) {
                let catArray = []

                this.props.selectedFilter && this.props.selectedFilter.length > 0 && this.props.selectedFilter.map((item, index) => {
                    return catArray.push(...item.filterItems, this.state.currentSelectedFilter)
                })

                let currentSelectedFilter = Array.from(new Set(catArray))

                this.setState({
                    option1: false,
                    filterMenuId: 0,
                    currentSelectedFilter: currentSelectedFilter
                })
            }
        })

        if (this.props && this.props.moreCurrentFilter) {
            let currentSelectedFilter = this.state.currentSelectedFilter
            currentSelectedFilter = Array.from(new Set([...this.props.moreCurrentFilter, ...this.state.currentSelectedFilter]))
            this.setState({
                currentSelectedFilter: currentSelectedFilter
            })

            
        }

    }

    componentWillReceiveProps(nextProps, nextState) {
        let currentSelectedFilter = this.state.currentSelectedFilter
        currentSelectedFilter = Array.from(new Set([...nextProps.moreCurrentFilter, ...this.state.currentSelectedFilter]))
        this.setState({
            currentSelectedFilter: currentSelectedFilter
        })
        let catArray = [];
        this.props.selectedFilter && this.props.selectedFilter.map((value,i) => {
            return(
            catArray.push(value.filterCategory)
            )
        })
        this.setState({
            catArray: catArray
        })
    }

    handleOpenOptions = () => {
        this.setState({
            option1: true,
            filterMenuId: 0,
        })
    }

    handleFilterMenu = (id) => {
        this.setState({ filterMenuId: id, option1: false });
    }

    closeOption = () => {
        let catArray = []

        this.props.selectedFilter && this.props.selectedFilter.length > 0 && this.props.selectedFilter.map((item, index) => {
            return catArray.push(...item.filterItems, ...this.state.currentSelectedFilter)
        })

        let currentSelectedFilter = Array.from(new Set(catArray))

        this.setState({
            option1: false,
            filterMenuId: 0,
            currentSelectedFilter: currentSelectedFilter
        })
    }


    filterSearch = (filterCategory) => {
        let getFilterData = document.getElementByName(filterCategory + "[]").value;
        alert(getFilterData);
        this.props.callFilter(filterCategory);
        this.setState({ filterMenuId: 0 });
    }


    handleArticleSearch = (event, searchType) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let filterObject = {};
        let filterItem = [];

        for (let name of data.keys()) {
            filterItem.push(data.get(name));
        }
            set(filterObject, 'filterCategory', searchType);
            set(filterObject, 'filterItems', filterItem);
            this.props.callFilter(filterObject);
            this.setState({ filterMenuId: 0, option1: false });
      
        if (searchType === 'collection_id') {
            this.renderCollectionDisplayName()
        }
        let catArray = []

        this.props.selectedFilter && this.props.selectedFilter.length > 0 && this.props.selectedFilter.map((item, index) => {
            return catArray.push(item.filterCategory)
        })

        this.setState({ filterMenuId: 0, option1: false, catArray: catArray });
    }

    clearAll = () => {
        this.props.resetFilter()
        this.setState({
            currentSelectedFilter: [],
            collectionSelected: [],
            formCollectionName: 'Form Collection',
            filterClassName: "filterbutton  dropdown-toggle",
            catArray: []
        })



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
        return (isFilterCategoryExist > 0 ||this.state.currentSelectedFilter.indexOf(item) > -1) ? true : false;
    }

    onChange = (value, type = '', title = '') => {

        let currentSelectedFilter = cloneDeep(this.state.currentSelectedFilter), tempIndex
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

        if (type === 'collection') {
            let collectionSelected = cloneDeep(this.state.collectionSelected)
            if (collectionSelected.length > 0) {

                tempIndex = collectionSelected.indexOf(value)
                if (tempIndex > -1) {
                    collectionSelected.splice(tempIndex, 1)
                }

                if (tempIndex <= -1) {
                    collectionSelected.push(value)
                }
            } else {
                collectionSelected.push(value)
            }
            this.setState({
                collectionSelected: collectionSelected
            })
        }

        this.setState({
            currentSelectedFilter: currentSelectedFilter
        })
    }


    renderDisplayName = (displayName, category) => {

        let selectedFilter = this.props.selectedFilter

        selectedFilter = selectedFilter && selectedFilter.length > 0 && selectedFilter.filter((item, index) => {
            return item.filterCategory === category
        })

        if (selectedFilter && selectedFilter.length > 0 && selectedFilter[0].filterItems.length > 0) {
            if (selectedFilter[0].filterItems.length === 1) {
                let value = selectedFilter[0].filterItems[0]
                let filterList = this.props.filterList;
                filterList = filterList && filterList.length > 0 && filterList.filter((tempValue, i) => {
                    return tempValue.slug === category
                })

                let tempFilters = filterList && filterList.length > 0 && filterList[0].filters
                tempFilters = tempFilters && tempFilters.length > 0 && tempFilters.filter((teval, ind) => {
                    return teval.value === value
                })

                let returnName
                if (category === "grade_levels") {
                    if (tempFilters && tempFilters.length > 0) {
                        returnName = 'Grade ' + tempFilters[0].display_name
                    }
                } else {
                    returnName = tempFilters && tempFilters.length > 0 && tempFilters[0].display_name
                }
                return returnName
            } else {
                return `${displayName} (${selectedFilter[0].filterItems.length})`
            }
        } else {
            return displayName
        }
    }

    renderCollectionDisplayName = () => {
        let defaultName = 'From Collection', collectionDisplayName;

        let collectionSelected = cloneDeep(this.state.collectionSelected)
        let filterClassChange = this.state.filterClassName
        if (collectionSelected.length > 0) {
            if (collectionSelected.length === 1) {
                collectionDisplayName = collectionSelected[0]

            } else {
                collectionDisplayName = `${defaultName} (${collectionSelected.length})`
            }
            filterClassChange = "filterSelect dropdown-toggle"
        } else {
            collectionDisplayName = defaultName
            filterClassChange = "filterbutton  dropdown-toggle"

        }
        this.setState({
            formCollectionName: collectionDisplayName,
            filterClassName: filterClassChange
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
        const filterList = this.props.filterList;
        const collectionData = this.props.collectionData;

        return (
            <div className="filter" ref={n => (this.node = n)} >
                <div className="btn-1 hidden">

                    <button className={this.state.filterClassName} onClick={this.handleOpenOptions}>{this.state.formCollectionName} </button>
                    {this.state.option1 ? <div className="dropdownvalue">
                        <p>Find content from your Collections.</p>
                        <form onSubmit={(event) => this.handleArticleSearch(event, 'collection_id')}>

                            {
                                collectionData && collectionData.length > 0 && collectionData.map((item, index) => {
                                    return (
                                        <label>
                                            <input type="checkbox"
                                                name={item.title}
                                                value={item.id}
                                                onChange={() => this.onChange(item.title, 'collection')}
                                                checked={this.isFilterItemSelected(item.slug, item.title)}

                                            />
                                            {item.title}
                                        </label>
                                    )
                                })
                            }



                            <div className="button-group">
                                <button className="cancel" onClick={this.closeOption}>Cancel</button>
                                <button className="apply" type='submit'>Apply</button>
                            </div>
                        </form>
                    </div> : null
                    }
                </div>

                {filterList.slice(0, 2).map((filterItem, index) => (

                    <div className="btn-1 hidden">
                        <button className={this.state.catArray.indexOf(filterItem.slug) > -1 ? "filterSelect  dropdown-toggle" : "filterbutton  dropdown-toggle"} onClick={() => this.handleFilterMenu(filterItem.display_order)}>{this.renderDisplayName(filterItem.display_name, filterItem.slug)}</button>
                        {(this.state.filterMenuId === filterItem.display_order) ?
                            (<div>
                                <form className="dropdownvalue" name={filterItem.slug} onSubmit={(event) => this.handleArticleSearch(event, filterItem.slug)}>
                                    <p>{this.filterContent(filterItem.slug)}</p>
                                    {
                                        filterItem.filters.map((Item, keyItem) => (
                                            <label >
                                                {Item.count === 0 ? <span className="cross-icon"><FontAwesomeIcon icon={faTimes} /></span> : (this.props.selectedFilter.length > 0) ? (<input type="checkbox"
                                                    name={`${filterItem.slug}_${keyItem}`}
                                                    value={Item.value}
                                                    disabled={!Item.count}
                                                    onChange={() => this.onChange(Item.value)}
                                                    checked={this.isFilterItemSelected(filterItem.slug, Item.value)}
                                                />) : (<input type="checkbox"
                                                name={`${filterItem.slug}_${keyItem}`}
                                                value={Item.value}
                                                disabled={!Item.count}
                                                onChange={() => this.onChange(Item.value)}
                                            />)}
                                                {filterItem.slug === "grade_levels" ? "Grade " : null}
                                                {Item.display_name} ({Item.count})
                                            </label>
                                        ))
                                    }
                                    <div className="button-group">
                                        <button className="cancel" onClick={this.closeOption}>Cancel</button>
                                        <button className="apply" type='submit'>Apply</button>
                                    </div>
                                </form>
                            </div>) : null
                        }

                    </div>

                ))}


                <div className="btn-1">
                    <button className="filterbutton show dropdown-toggle" onClick={this.props.showMoreFilter}>More Filters</button>
                    {/* hide button in desktop */}
                    <button className="filterbutton hidebtn  dropdown-toggle" onClick={this.props.showMoreFilter}>All Filters</button>
                </div>
                {
                    this.props.selectedFilter.length > 0 ?
                        <div className="btn-1">
                            <button className="clearbutton" onClick={() => this.clearAll()}>Clear</button>
                        </div> : ""
                }


            </div>


        )
    }
}

export default Filter
