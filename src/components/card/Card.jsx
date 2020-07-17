import React, { Component } from 'react'
import {connect} from "react-redux";
import Pagination from '../pagination/Pagination.jsx'
// import posts from "../../data.json"
import Checkbox from "../checkbox/Checkbox"
import Filter from '../filter'
import {saveSelectionAction} from '../../actions/cardAction'
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
     selectedContent: []
    }
  }

  setSelectedContent = (content) => {
    this.props.saveSelection(content);
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
    let data = this.props.jsonData

    return (
      <div className="card2">
        {/* <label className="mt-3 ml-4">Search</label>
        <input type="text" value={this.state.search} onChange={this.updateSearch} /> */}
        <div className="container py-4 mt-3">
        <Filter />
          {data && data.length >0 ? <div className="row pb-4" >
            {data && data.slice(this.state.pagination.start, this.state.pagination.end).map((post, i) => (
              <div className="col-md-3 mb-3" key={post.id}>
                <div className="card h-100 ">
                  <img src={post.image} width="100%" alt="imgage.png" />
                  <div className="card-body">
                    <h6>
                      {post.object.short_title}
                    </h6>
                    <p>{post.title}</p>
                  </div>
                  <Checkbox key={`checkbox-${i}`} content={post} setSelectedContent={this.setSelectedContent} />
                </div>
              </div>
            ))}
          </div>: <>No Results found</>}
          {data && data.length ? <Pagination
            showPerPage={this.state.showPerPage}
            onPaginationChange={this.onPaginationChange}
            total={data && data.length}
          /> : ""}
        </div>
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

