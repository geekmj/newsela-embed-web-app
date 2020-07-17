import React, { Component } from 'react'
import { connect } from "react-redux";
import Checkbox from "../checkbox/Checkbox"
import Filter from '../filter'
import { saveSelectionAction } from '../../actions/cardAction'
import * as _ from 'lodash'
class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPerPage: 4,
      search: "",
     
      selectedContent: []
    }
  }

  setSelectedContent = (content) => {
    this.props.saveSelection(content);
  }

  render() {
    let data = this.props.jsonData

    return (
      <div className="card2">
        <div className="container py-4 mt-3">
          <Filter />
          {data && data.length > 0 ? <div className="row pb-4" >
            {data && data.length > 0 && data.map((post, i) => (
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
          </div> : this.props.isLoading ? "" : <>No Results found</>}
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

