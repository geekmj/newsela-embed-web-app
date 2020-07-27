import React, { Component } from 'react';
import { set,indexOf,get,isEqual,findIndex } from 'lodash';
import './Filter.css'

// import MoreFilter from '../morefilter'

export class Filter extends Component {
    state={
        option1:false,
        filterMenuId:0,
    }

    componentDidMount (){
        window.addEventListener("click", event=>{
            if(this.state.option1  && !this.node.contains(event.target) || this.state.filterMenuId  && !this.node.contains(event.target)){
                this.setState({
                 option1:false,
                 filterMenuId:0
                })
            }
        })
    }

    handleOpenOptions = () =>{
        this.setState({
            option1:!this.state.option1,
            filterMenuId:0,
        })
    }
    handleFilterMenu = (id) => {
        this.setState({filterMenuId:id,option1:false});
    }

    closeOption = () =>{
        this.setState({
            option1:false,
            filterMenuId:0,
        })
    }
    filterSearch = (filterCategory) => {
        let getFilterData = document.getElementByName(filterCategory+"[]").value;
        alert(getFilterData);
        this.props.callFilter(filterCategory);
        this.setState({filterMenuId:0});
    }

    filterItemCheckbox = () =>{
        return(
            <input type="checkbox" checked={true} value="hello"/>
        )
    }

    handleArticleSearch = (event, searchType) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let filterObject = {};
        let filterItem = [];

        for(let name of data.keys()) 
        {
            filterItem.push(data.get(name));
        }
       if(filterItem.length > 0)
        {
            set(filterObject, 'filterCategory', searchType);
            set(filterObject, 'filterItems', filterItem);
            this.props.callFilter(filterObject);
            this.setState({filterMenuId:0});
        }

    }

    isFilterItemSelected = (category, item) => {
        alert("test") 
        const getFilterSelected = this.props.selectedFilter;
        const isFilterCategoryExist = findIndex(getFilterSelected,
            (filter) => { 
                return (isEqual(
                        get(filter,'filterCategory',null),
                        category
                        ) && (indexOf(get(filter,'filterItems',[]),item)>=0));   
            });
       return (isFilterCategoryExist > 0) ? true : false;
           
    }

    
    render() {
        const filterList = this.props.filterList;

        return (
            <div className="filter" ref={n =>(this.node = n)} >
               <div className="btn-1 hidden">
                <button className="filterbutton  dropdown-toggle" onClick={this.handleOpenOptions}>From Collections </button>
                {this.state.option1?<div className="dropdownvalue">
                  <p>Find content from your Collections.</p>
                  <lable>
                  <input  type="checkbox" value="hello"/>
                   Election 2020
                  </lable>
                  <lable>
                  <input type="checkbox" value="hello"/>
                   Election 2021
                  </lable>
                  <div className="button-group">
                     <button className="cancel" onClick={this.closeOption}>Cancel</button>
                     <button className="apply">Apply</button>
                  </div>
                   </div>:null
                }
              </div>

              
               {filterList.slice(0, 4).map((filterItem,index) => (
                    
                <div className="btn-1 hidden" >
                <form name={filterItem.slug} onSubmit={(event) => this.handleArticleSearch(event,filterItem.slug)}>
                  <button className="filterbutton dropdown-toggle" onClick={() => this.handleFilterMenu(filterItem.display_order)}>{filterItem.display_name}</button>
                  { (this.state.filterMenuId === filterItem.display_order) ?<div className="dropdownvalue">
                  <p>Find content from your {filterItem.display_name}.</p>
                  
                  { 
                    filterItem.filters.map((Item,keyItem) => ( 
                      <lable>
                       <input  type="checkbox" 
                          name={`${filterItem.slug}_${keyItem}`} 
                          value={Item.value}
                        /> 
                        {Item.display_name} ({Item.count})
                      </lable>
                   ))
                  }
                  <div className="button-group">
                     <button className="cancel" onClick={this.closeOption}>Cancel</button>
                     <button className="apply" type='submit'>Apply</button>
                  </div>
                   </div>:null
                }
                </form>
                </div>

               ))}


               <div className="btn-1">
                <button className="filterbutton  dropdown-toggle" onClick={this.props.showMoreFilter}>More Filter</button>
              </div>
                
            </div>

              
        )
    }
}

export default Filter

