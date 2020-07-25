import React, { Component } from 'react'
import '../../assets/styles/style.css'
// import MoreFilter from '../morefilter'

export class Filter extends Component {
    state={
        option1:false,
        option2:false,
        filterMenuId:0,
    }
    handleOpenOptions = () =>{
        this.setState({
            option1:!this.state.option1,
            option2:false
        })
    }
    handleFilterMenu = (id) => {
        this.setState({filterMenuId:id});
    }

    handleOpenOptions1 = () =>{
        this.setState({
            option2:!this.state.option2,
            option1:false
        })
    }
    closeOption = () =>{
        this.setState({
            option2:false,
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

    
    componentDidMount (){
        window.addEventListener("click", event=>{
            if(this.state.option1  && !this.node.contains(event.target) || this.state.option2  && !this.node.contains(event.target)){
                this.setState({
                 option1:false,
                 option2:false
                })
            }
        })
    }
    
    render() {
        const filterList = this.props.filterList;

        return (
            <div className="filter" ref={n =>(this.node = n)} >
               <div className="btn-1">
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

              
               {filterList.map((filterItem,index) => ( 
                <div className="btn-1">
                
                  <button className="filterbutton dropdown-toggle" onClick={() => this.handleFilterMenu(filterItem.display_order)}>{filterItem.display_name}</button>
                  { (this.state.filterMenuId === filterItem.display_order) ?<div className="dropdownvalue">
                  <p>Find content from your {filterItem.display_name}.</p>
                  { filterItem.filters.map((Item,index) => ( 
                      <lable><input  type="checkbox" value={Item.value}/> {Item.display_name} ({Item.count})</lable>
                   ))
                  }
                  <div className="button-group">
                     <button className="cancel" onClick={this.closeOption}>Cancel</button>
                     <button className="apply" onClick={() => this.filterSearch(filterItem.slug)}>Apply</button>
                  </div>
                   </div>:null
                }
                </div>

               ))}
                
            </div>

              
        )
    }
}

export default Filter

