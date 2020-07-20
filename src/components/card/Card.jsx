import React, { Component } from 'react'
import { connect } from "react-redux";
import Checkbox from "../checkbox/Checkbox"
import Filter from '../filter'
import { saveSelectionAction } from '../../actions/cardAction'
import * as _ from 'lodash'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPerPage: 4,
      search: "",
      changeView:false,
      selectedContent: []
    }
  }

  setSelectedContent = (content) => {
    this.props.saveSelection(content);
  }

  handleChangeView = () =>{
    this.setState({
      changeView:true
    })
  }
  handleChangeViewList = () =>{
    this.setState({
      changeView:false
    })
  }


  render() {
    let data = this.props.jsonData
    let {changeView}= this.state;

    return (

          // <div className="card2">
          //  <div className="container-fluid py-4 mt-3 px-4">
          //    <Filter />
          //      {data && data.length > 0 ? <div className="row pb-4 pr-3" >
          //      {data && data.length > 0 && data.map((post, i) => (
          //        <div className={`mb-3 pr-0 ${changeView?'col-md-6':'col-md-3'}`} key={post.id}>
          //          <div className="card h-100 ">
          //            <div className="card h-100 ">
          //                   <div>
          //                      <img src={post.image} width="100%" alt="imgage.png" />
          //                   </div>
          //                     <div className="card-body">
          //                        <h6 className="card-title" >
          //                           {post.object.short_title}
          //                        </h6>
          //                        <p className="card-text">{post.title}</p>
          //                     </div> 
          //                    <div className="card-footer">
          //                       {/* <button className="sendbutton  dropdown-toggle" >Send</button> */}
                            
          //                      <UncontrolledDropdown >
          //                         <DropdownToggle caret className="sendbutton" >send</DropdownToggle>
          //                            <DropdownMenu>
          //                              <DropdownItem header>Send Link</DropdownItem>
          //                             <DropdownItem>Embed Small</DropdownItem>
          //                             <DropdownItem>Embed Medium</DropdownItem>
          //                             <DropdownItem>Embed Large</DropdownItem>
          //                             </DropdownMenu>
          //                     </UncontrolledDropdown>
          //                    </div>
          //                       {/* <Checkbox key={`checkbox-${i}`} content={post} setSelectedContent={this.setSelectedContent} /> */}
          //                </div>
          //         </div>
          //       </div>
          //      ))}
          //    </div> : this.props.isLoading ? "" : <>No Results found</>}
          //  </div>
          // </div>
      
          




 <div class="container-fluid px-4 py-4 mt-3">
  <button onClick={this.handleChangeView}>Grid</button>
  <button onClick={this.handleChangeViewList}>List</button>
    {data && data.length > 0 ? <div className="row pr-3">
    {data && data.length > 0 && data.map((post, i) => (
     <div className= {`mb-3 pr-0 ${changeView?'col-md-3':'col-md-6'}`} key={post.id}> 
     <div class="card h-100 p-3">
       <div class="row list-wrap">                     
               <div className="col-md-4 pr-0">
                   <img src={post.image} width="100%" alt="imgage.png" />
               </div>
               <div class="col-md-8">
                   <h6 class="card-title">{post.object.short_title}</h6>
                   <p class="card-text">{post.title}</p>
                   <button className="sendbutton dropdown-toggle">Send</button>
                   {/* <UncontrolledDropdown >
                       <DropdownToggle caret className="sendbutton" >send</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>Send Link</DropdownItem>
                            <DropdownItem>Embed Small</DropdownItem>
                            <DropdownItem>Embed Medium</DropdownItem>
                            <DropdownItem>Embed Large</DropdownItem>
                           </DropdownMenu>
                   </UncontrolledDropdown> */}
               </div>
       </div>
     </div>
    </div>
   
    ))}
   </div>: this.props.isLoading ? "" : <>No Results found</>}
 </div> 

       
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    saveSelection: (params) => dispatch(saveSelectionAction(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)

