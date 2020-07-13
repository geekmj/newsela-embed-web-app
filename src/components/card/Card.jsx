import React, { Component } from 'react'
import Pagination from '../pagination/Pagination.jsx'
// import posts from "../../data.json"
import Checkbox from "../checkbox/Checkbox"
import * as _ from 'lodash'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPerPage: 4,
      search: "",
      pagination: {
        start: 0,
        end: 4
      },
      posts: this.props.jsonData,
      selectedContent: []
    }
  }

  setSelectedContent = (content) => {
    let selectedContent = _.cloneDeep(this.state.selectedContent), tempIndex

    let tempContent = content && Object.keys(content).length > 0 && selectedContent && selectedContent.length > 0 && selectedContent.filter((value, index) => {
      // if(value.id === content.id){
      //   return tempIndex = index
      // }
    })

    if (tempContent && tempContent.length > 0) {
      selectedContent.splice(tempIndex, 1)
    } else {
      selectedContent.push(content)
    }

    this.setState({
      selectedContent: selectedContent
    })
  }

  onPaginationChange = (start, end) => {
    this.setState({
      pagination: {
        start: start,
        end: end
      }
    })
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.substr(0, 20)
    })
  }

  render() {

    let filterTitle = this.state.posts && this.state.posts.length > 0 && this.state.posts.filter(
      (Tit) => {
        return Tit.title.toLocaleLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1;
      }
    )

    return (
      <div className="card2">
        <label className="mt-3 ml-4">Search</label>
        <input type="text" value={this.state.search} onChange={this.updateSearch} />
        <div className="container py-4 mt-3">
          <div className="row pb-4" >
            {filterTitle && filterTitle.slice(this.state.pagination.start, this.state.pagination.end).map((post, i) => (
              <div className="col-md-3 mb-3" key={post.id}>
                <div className="card">
                  <img src={post.image} width="100%" alt="imgage.png" />
                  <div className="card-body">
                    <h6>
                      #{post.id} {post.title}
                    </h6>
                    <p>{post.body}</p>
                  </div>
                  <Checkbox key={`checkbox-${i}`} content={post} setSelectedContent={this.setSelectedContent} />
                </div>
              </div>
            ))}
          </div>
          {this.state.posts && this.state.posts.length ? <Pagination
            showPerPage={this.state.showPerPage}
            onPaginationChange={this.onPaginationChange}
            total={this.state.posts && this.state.posts.length}
          /> : ""}

        </div>
      </div>
    )
  }
}

export default Card;
