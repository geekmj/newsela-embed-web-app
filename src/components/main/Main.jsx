import React, { Component } from 'react'
import { connect } from 'react-redux';
import { parseQuery, readCookie } from '../../utils/commonFunctions';
import { searchApi ,filterCollectionApi} from '../../services/common.services';
import { saveQueryParamsOnLaunchAction, saveResultsAction } from '../../actions/mainAction.js';
import Card from '../card';
import Searchbar from '../searchbar';
import Loader from '../loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import Filter from '../filter';
import MoreFilter from '../morefilter';
import { findIndex, get, isEqual } from 'lodash';


class Main extends Component {
    state = {
        jsonData: [],
        filter: [],
        selectedFilterOption: [],
        searchKey: '',
        currentPage: 0,
        isLoading: false,
        changeView: false,
        moreFilter: false,
        showMoreLoading: false,
        collectionData:[]
    }

    componentDidMount() {
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));
        this.searchAndSave();
        this.getCollectionData();
    }

    getCollectionData =()=>{
        filterCollectionApi().then((res)=>{
            console.log("filterCollectionApi==>",JSON.stringify(res.data))
            this.setState({
                collectionData:res.data
            })

        })
    }
    sortByDisplayOrder = (firstDisplayOrder, secondDisplayOrder) => {
        if (firstDisplayOrder.display_order < secondDisplayOrder.display_order) {
            return -1;
        }
        if (firstDisplayOrder.display_order > secondDisplayOrder.display_order) {
            return 1;
        }
        return 0;
    } 

    resetFilter = ()=>{
        this.setState({
            selectedFilterOption:[],
            collectionData:[]
        })
        this.searchAndSave();
        this.getCollectionData();
    }
    searchByFilter = (data) => {
        let getSelectedFilter = this.state.selectedFilterOption;
        const isFilterCategoryExist = findIndex(getSelectedFilter,
            (filter) => {
                return isEqual(
                    get(filter, 'filterCategory', null),
                    get(data, 'filterCategory', null)
                );
            });
        if (isFilterCategoryExist >= 0) {
            getSelectedFilter[isFilterCategoryExist] = data;
        } else {
            getSelectedFilter.push(data);
        }
        this.setState({ selectedFilterOption: getSelectedFilter });
        this.searchAndSave('filterSearch');
    }

    searchAndSave = (type = '') => {
        let requestParam =   (this.state.searchKey.trim() === "") ? "" : `&needle=${this.state.searchKey.trim()}`;
        let getSelectedFilter = this.state.selectedFilterOption;
        let isFilterExist     = (this.state.filter.length > 0) ? true : false;
        if ((type == 'search' && requestParam!="") || type != 'search') {

            let currentPage = 1;
            if (type == 'loadMore') {
                this.setState({
                    showMoreLoading: true
                })
            } else {
                this.setState({ isLoading: true })
            }

            if (type == 'loadMore') {
                currentPage = this.state.currentPage + 1;
            }
          
            if(getSelectedFilter.length > 0){
                //requestParam = "";
                getSelectedFilter.forEach((filter) => {
                    const filterItems = filter.filterItems.join(",");
                    requestParam += `&${filter.filterCategory}=${filterItems}`;
                });
            }


            searchApi(requestParam, currentPage).then((response) => {
                const filter = response.data.aggregations.facets;
                let filterRender = isFilterExist ? this.state.filter : filter.sort(this.sortByDisplayOrder);
                filterRender.forEach((item,index) => {
                       console.log(item)      
                })    
          
                let updatedJson = null;
                if (type == 'loadMore') {
                    updatedJson = this.state.jsonData;
                    updatedJson = [...updatedJson, ...response.data.results]
                } else {
                    updatedJson = response.data.results;
                }


                this.setState({
                    jsonData: updatedJson,
                    filter: filterRender,
                    currentPage: currentPage,
                })
                if (type == 'loadMore') {
                    this.setState({
                        showMoreLoading: false
                    })
                } else {
                    this.setState({ isLoading: false })
                }
                this.props.saveResults(updatedJson);
            })
        }
    }

    updateValue = (key, value) => {

        if (key == 'searchKey') {
            this.setState({
                searchKey: value
            })
        }
    }

    loadMore = () => {
        this.searchAndSave('loadMore')
    }

    handleChangeViewList = () => {
        this.setState({
            changeView: true
        })
    }
    handleChangeViewGrid = () => {
        this.setState({
            changeView: false
        })
    }
    showMoreFilter = () => {
        this.setState({
            moreFilter: !this.state.moreFilter
        })
    }

    render() {
        let { changeView } = this.state;

        return (<>
            <Searchbar searchAndSave={this.searchAndSave} updateValue={this.updateValue} jsonData={this.props.jsonData} />
            <div className="container-wrapper" >
                <div className="container-fluid pt-4 mt-3 px-4">
                    <div className="icon-grid-list">
                        <FontAwesomeIcon icon={faThLarge} onClick={this.handleChangeViewGrid} className={`grid ${changeView ? '' : 'active'}`} />
                        <FontAwesomeIcon icon={faThList} onClick={this.handleChangeViewList} className={`list ${changeView ? 'active' : ''}`} />
                    </div>
                    <div>
                        <Filter
                            callFilter={this.searchByFilter}
                            filterList={this.state.filter}
                            selectedFilter={this.state.selectedFilterOption}
                            showMoreFilter={this.showMoreFilter}
                            collectionData ={this.state.collectionData}
                            resetFilter ={this.resetFilter}
                        />

                        {
                            this.state.moreFilter ?
                                (<MoreFilter
                                    cancel={this.showMoreFilter}
                                    callFilter={this.searchByFilter}
                                    filterList={this.state.filter}
                                    selectedFilter={this.state.selectedFilterOption}
                                />)
                                :
                                (<div>
                                    <Card
                                        isLoading={this.state.isLoading}
                                        jsonData={this.state.jsonData}
                                        changeView={this.state.changeView}
                                    />
                                    {this.state.jsonData && this.state.jsonData.length == 0 ? "" : (<div className="load-more-bgcolor">{!this.state.showMoreLoading ? <button className="load-more-button" onClick={() => this.loadMore()}>Show More Results</button> : ""}</div>)}

                                    {this.state.isLoading ? <Loader /> : ""}
                                    {this.state.showMoreLoading ? <Loader type="showMore" /> : ""}

                                </div>)
                        }
                    </div>
                </div>
            </div>
        </>)
    }
}

function mapStateToProps(state) {
    return {
        jsonData: state.rootReducer.mainReducer.resultsData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveQueryParamsOnLaunch: (params) => dispatch(saveQueryParamsOnLaunchAction(params)),
        saveResults: (params) => dispatch(saveResultsAction(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
