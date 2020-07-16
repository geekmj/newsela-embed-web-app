import React, { Component } from 'react'
import Pagination from '../pagination/Pagination.jsx'
import posts from "../../data.json"
import Checkbox from "../checkbox/Checkbox"
import Filter from "../filter/Filter"

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPerPage:8,
            search:"",
            pagination:{
                start: 0,
                end: 4
            }
        }
    }
    onPaginationChange = (start, end) =>{
         this.setState({
             pagination:{
                 start:start,
                 end:end
             }
         })
    }

     updateSearch = (event)=>{
         this.setState({
             search:event.target.value.substr(0,20)
         })
     }
    render() {

        let filterTitle= posts.filter(
            (Tit)=>{
                return Tit.title.toLocaleLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !==-1;
            }
        )

        return (
            <div className="card2">
            {/* <label className="mt-3 ml-4">Search</label> */}
            {/* <input type="text" value ={this.state.search} onChange={this.updateSearch} /> */}
            <div className="container py-4 mt-3">
            < Filter />
              <div className="row pb-4" >
                {filterTitle.slice(this.state.pagination.start, this.state.pagination.end).map((post,i) => (
                  <div className="col-md-3 mb-3" key={post.id}>
                    <div className="card  h-100">
                    <img className="card-img-top" src={post.image} width="100%" alt="imgage.png" />
                      <div className="card-body ">
                        <h6 class="card-title ">
                          #{post.id} {post.title}
                        </h6>
                        <p class="card-text">{post.body}</p>
                      </div>
                      {/* <Checkbox  /> */}
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                showPerPage={this.state.showPerPage}
                onPaginationChange={this.onPaginationChange}
                total={posts.length}
              />
            </div>
          </div>
        )
    }
}

export default Card
