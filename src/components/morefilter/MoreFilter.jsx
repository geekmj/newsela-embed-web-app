import React, { Component } from 'react'
import { set } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./MoreFilter.css"

class MoreFilter extends Component {
   constructor(props) {
      super(props)
      this.state = {
         filters: []
      }
   }


   handleArticleSearch(event){
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      let filterObject = {};
      let filterItem = [];
   
      for(let name of data.keys()) 
      {
          var getItemName = name.split("_");
          filterItem.push(data.get(name));
          console.log("####### -----> ",getItemName[0], data.get(name));
      }
     if(filterItem.length > 0)
      {
          console.log(JSON.stringify(filterItem));
          set(filterObject, 'filterCategory', getItemName[0]);
          set(filterObject, 'filterItems', filterItem);
          this.props.callFilter(filterObject);
          this.props.cancel();
      }
   
   }

   render() {
      let props = this.props
      const filterList = props.filterList;

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

                     {filterList.map((filterItem, index) => (

                        <div className="col-md-6">
                           <h6 className="pt-2">{filterItem.display_name}</h6>
                           <div className="more-filer-list">
                              <p className="px-3">Find content from your {filterItem.display_name}.</p>
                              {
                                 filterItem.filters.map((Item, keyItem) => (
                                    <label>
                                       {Item.count === 0 ? <span className="cross-icon"><FontAwesomeIcon icon={faTimes} /></span>: <input type="checkbox"
                                          name={`${filterItem.slug}_${keyItem}`}
                                          value={`${filterItem.slug}_${Item.value}`}
                                          disabled={!Item.count}
                                       />}
                                       {Item.display_name} ({Item.count})
                              </label>
                                 ))
                              }

                           </div>
                        </div>
                     ))}
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
