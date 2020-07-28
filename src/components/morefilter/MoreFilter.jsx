import React from 'react'
import "./MoreFilter.css"
const MoreFilter = (props) => {
   const filterList = props.filterList;
    return (
         <div className="filter-wrapper">
            <div className="container-fluid my-4 px-4">
              <div>
                  <div className="button-group">
                     <button className="cancel" onClick={props.cancel}>Cancel</button>
                     <button className="apply">Apply</button>
                  </div> 
                  <div className="row">
                  {filterList.map((filterItem,index) => (
                     <div className="col-md-6">
                        <h6 className="pt-2">{filterItem.display_name}</h6>
                        <div className="more-filer-list">
                         <p className="px-3">Find content from your {filterItem.display_name}.</p>
                         { 
                           filterItem.filters.map((Item,keyItem) => ( 
                              <label>
                                 <input  type="checkbox" 
                                 name={`${filterItem.slug}_${keyItem}`} 
                                 value={Item.value}
                                 /> 
                                 {Item.display_name} ({Item.count})
                              </label>
                           ))
                         }
                         
                        </div> 
                     </div>
                  ))}
                  </div> 

                  <div className="button-group">
                     <button className="cancel" onClick={props.cancel}>Cancel</button>
                     <button className="apply">Apply</button>
                  </div>   
              </div>    

            </div>
         </div>
    )
}

export default MoreFilter
