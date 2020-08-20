import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { parseQuery } from '../../utils/commonFunctions';
import { searchApi, filterCollectionApi } from '../../services/common.services';
import { saveQueryParamsOnLaunchAction, saveResultsAction } from '../../actions/mainAction.js';
import Card from '../card';
import Searchbar from '../searchbar';
import Loader from '../loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import Filter from '../filter';
import MoreFilter from '../morefilter';
import { findIndex, get, isEqual, isArray } from 'lodash';


class Main extends PureComponent {
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
    collectionData: [],
    moreCurrentFilter: [],
    pageSize:12,
    lastPage :1,
    isMoreFilter:'',
    queryParam: {}
  };

  componentDidMount() {
    const getQueryParam = parseQuery(this.props.location.search);
    if(getQueryParam!==null){
      window.localStorage.setItem('queryParam', JSON.stringify(getQueryParam));
      this.setState({
        queryParam: getQueryParam
      });
    }
    this.props.saveQueryParamsOnLaunch(parseQuery(getQueryParam));
    this.searchAndSave();
    this.getCollectionData();
  }

  getCollectionData = () => {
    filterCollectionApi().then((res) => {
      this.setState({
        collectionData: res.data
      });
    });
  };
  sortByDisplayOrder = (firstDisplayOrder, secondDisplayOrder) => {
    if (firstDisplayOrder.display_order < secondDisplayOrder.display_order) {
      return -1;
    }
    if (firstDisplayOrder.display_order > secondDisplayOrder.display_order) {
      return 1;
    }
    return 0;
  };

  resetFilter = () => {
    this.setState({
      selectedFilterOption: [],
      selectedFilter: [],
      collectionData: [],
      moreCurrentFilter: [],
      moreFilter: false
    });
    this.searchAndSave('reset');
    this.getCollectionData();
  };

  setFilterData = (data, getSelectedFilter) => {
    const isFilterCategoryExist = findIndex(getSelectedFilter, (filter) => {
      return isEqual(
        get(filter, 'filterCategory', null),
        get(data, 'filterCategory', null)
      );
    });

    if (isFilterCategoryExist >= 0) {
      getSelectedFilter[isFilterCategoryExist] = data;
      if (data.filterItems.length === 0) {
        let tempIndex;
        getSelectedFilter.filter((value, index) => {
          if (value.filterCategory === data.filterCategory) {
            tempIndex = index
            return true
          } else {
            return false
          }
        })
  
        getSelectedFilter.splice(tempIndex, 1)
      }
     
    } else {
      getSelectedFilter.push(data);
    }
    return getSelectedFilter;
  }

  searchByFilter = (data, type = '') => {
    let getSelectedFilter = this.state.selectedFilterOption;
    if(isArray(data)){
      data.forEach((item, index) => {
        getSelectedFilter = this.setFilterData(item, getSelectedFilter);
      })
    }else{
      getSelectedFilter = this.setFilterData(data, getSelectedFilter);
    }
    //console.log("Data ---> ",getSelectedFilter);
    this.setState({ selectedFilterOption: getSelectedFilter, isMoreFilter: type });
    this.searchAndSave('filterSearch');
  };

  searchAndSave = (type = '') => {
    let requestParam = `&needle=${this.state.searchKey}`
    let getSelectedFilter = this.state.selectedFilterOption;
    let isFilterExist = (this.state.filter.length > 0) ? true : false;
    if ((type === 'search' && requestParam !== "") || type !== 'search') {

      let currentPage = 1;
      if (type === 'loadMore') {
        this.setState({
          showMoreLoading: true
        })
      } else {
        this.setState({ isLoading: true })
      }

      if (type === 'loadMore') {
        currentPage = this.state.currentPage + 1;
      }

      if (getSelectedFilter.length > 0 && type!=='reset') {
        //requestParam = "";
        getSelectedFilter.forEach((filter) => {
          const filterItems = filter.filterItems.join(",");
          const filterCategory = (filter.filterCategory === 'language') ? 'languages' : filter.filterCategory;
          requestParam += `&${filterCategory}=${filterItems}`;
        });
      }


      searchApi(requestParam, currentPage,this.state.pageSize).then((response) => {
        const filter = response.data.aggregations.facets;
        let filterRender = isFilterExist ? this.state.filter : filter.sort(this.sortByDisplayOrder);
        filterRender.forEach((item, index) => {
          console.log(item)
        });

        let updatedJson = null;
        if (type === 'loadMore') {
          updatedJson = this.state.jsonData;
          updatedJson = [...updatedJson, ...response.data.results];
        } else {
          updatedJson = response.data.results;
        }
        let lastPage = Math.ceil(response.data.total_results/this.state.pageSize);

        this.setState({
          jsonData: updatedJson,
          filter: filterRender,
          currentPage: currentPage,
          lastPage:lastPage
        });

        if (type === 'loadMore') {
          this.setState({
            showMoreLoading: false
          });
        } else {
          this.setState({ isLoading: false })
        }
        this.props.saveResults(updatedJson);
      });
    }
  };

  updateValue = (key, value) => {
    if (key === 'searchKey') {
      this.setState({
        searchKey: value
      });
    }
  };

  loadMore = () => {
    this.searchAndSave('loadMore')
  };

  handleChangeViewList = () => {
    this.setState({
      changeView: true
    })
  };
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

  setMoreCurrentFilter = (filter) => {
    this.setState({
      moreCurrentFilter: filter
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
              collectionData={this.state.collectionData}
              resetFilter={this.resetFilter}
              moreCurrentFilter={this.state.moreCurrentFilter}
              isMoreFilter={this.state.isMoreFilter}
            />

            {
              this.state.moreFilter ?
                (<MoreFilter
                  cancel={this.showMoreFilter}
                  callFilter={this.searchByFilter}
                  filterList={this.state.filter}
                  resetFilter={this.resetFilter}
                  selectedFilter={this.state.selectedFilterOption}
                  setMoreCurrentFilter={this.setMoreCurrentFilter}
                  collectionData={this.state.collectionData}
                />)
                :
                (<div>
                  <Card
                    isLoading={this.state.isLoading}
                    jsonData={this.state.jsonData}
                    changeView={this.state.changeView}
                    queryParams ={this.props.queryParams}
                  />
                  {this.state.jsonData && this.state.jsonData.length === 0 ? "" : (<div className="load-more-bgcolor">{!this.state.showMoreLoading && this.state.lastPage !== this.state.currentPage ? <button className="load-more-button" onClick={() => this.loadMore()}>Show More Results</button> : ""}</div>)}

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
    jsonData: state.rootReducer.mainReducer.resultsData,
    queryParams: state.rootReducer.mainReducer.queryParams
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveQueryParamsOnLaunch: (params) => dispatch(saveQueryParamsOnLaunchAction(params)),
    saveResults: (params) => dispatch(saveResultsAction(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)