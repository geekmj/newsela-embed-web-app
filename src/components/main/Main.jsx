import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseQuery, readCookie } from '../../utils/commonFunctions'
import { searchApi } from '../../services/common.services'
import { saveQueryParamsOnLaunchAction, saveResultsAction } from '../../actions/mainAction.js'
import Card from '../card'
import Searchbar from '../searchbar';
import Loader from '../loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons'
import Filter from '../filter'
import MoreFilter from '../morefilter'
class Main extends Component {
    state = {
        jsonData: [],
        filter: [],
        searchKey: '',
        currentPage: 0,
        isLoading: false,
        changeView: false,
        moreFilter:false
    }

    componentDidMount() {
        console.log("--->",document.cookie)
        //Get query params from url
        this.props.saveQueryParamsOnLaunch(parseQuery(this.props.location.search));
        this.searchAndSave()
    }
    sortByDisplayOrder = (firstDisplayOrder,secondDisplayOrder) => {
        if (firstDisplayOrder.display_order < secondDisplayOrder.display_order ){
            return -1;
          }
          if (firstDisplayOrder.display_order > secondDisplayOrder.display_order ){
            return 1;
          }
          return 0;
    }

    searchByFilter = (data) => {
          alert("Test ----> "+data);
    }

    searchAndSave = (type = '') => {

        if ((type == 'search' && this.state.searchKey.trim()) || type != 'search') {

            let currentPage = 1

            this.setState({
                isLoading: true
            })

            if (type == 'loadMore') {
                currentPage = this.state.currentPage + 1
            }

            searchApi(this.state.searchKey, currentPage).then((response) => {
                const filter = response.data.aggregations.facets;
                let filterRender = filter.sort(this.sortByDisplayOrder);
                filterRender.forEach((item,index) => {
                       console.log(item)      
                })    
                
                
                let updatedJson = null;
                if (type == 'loadMore') {
                    updatedJson = this.state.jsonData
                    updatedJson = [...updatedJson, ...response.data.results]
                } else {
                    updatedJson = response.data.results
                }

                this.setState({
                    jsonData: updatedJson,
                    filter:filterRender,
                    currentPage: currentPage,
                    isLoading: false,
                })
                this.props.saveResults(updatedJson)
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
      showMoreFilter = () =>{
        this.setState({
            moreFilter: !this.state.moreFilter
          })
      }

    render() {
        let {changeView}= this.state;
        
        return (<>
            <Searchbar searchAndSave={this.searchAndSave}  updateValue={this.updateValue} jsonData={this.props.jsonData} />  
            <div className="container-wrapper" >
            <div className="container-fluid pt-4 mt-3 px-4">
            <div className="icon-grid-list">
              <FontAwesomeIcon icon={faThLarge} onClick={this.handleChangeViewGrid} className={`grid ${changeView ? '' : 'active'}`} />
              <FontAwesomeIcon icon={faThList} onClick={this.handleChangeViewList} className={`list ${changeView ? 'active' : ''}`} />
            </div>
            <div className="ff">
                 <Filter callFilter={this.searchByFilter} filterList={this.state.filter} />
                 <button class="filterbutton dropdown-toggle" onClick={this.showMoreFilter}>More Filters</button>{
                     this.state.moreFilter? <MoreFilter cancel={this.showMoreFilter}  />
                     : <div><Card isLoading={this.state.isLoading} jsonData={this.state.jsonData}  changeView={this.state.changeView} />
                     {this.state.jsonData && this.state.jsonData.length == 0 ? "" :<div className="load-more-bgcolor"><button className="load-more-button" onClick={() => this.loadMore()}>Show More Results</button></div>}
                     {this.state.isLoading ? <Loader /> : ""}
                     </div>
                 }
            </div>
            
            {/* <Card isLoading={this.state.isLoading} jsonData={this.state.jsonData}  changeView={this.state.changeView} />
            {this.state.jsonData && this.state.jsonData.length == 0 ? "" :<div className="load-more-bgcolor"><button className="load-more-button" onClick={() => this.loadMore()}>Show More Results</button></div>}
            {this.state.isLoading ? <Loader /> : ""} */}
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

