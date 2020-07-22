import React, { Component } from 'react'
import DropDown from '../dropdown'
import Filter from '../filter'
import * as _ from 'lodash'
import embedResType from '../../utils/embedResTypes'
import ErrorFallback from '../errorFallback/ErrorFallback';
import { NEWSELA_URL } from '../../constants/urls'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPerPage: 4,
      search: "",

      selectedContent: []
    }
  }

  prepareJson = (value, data) => {

    let selectedType = value;
    let selectedData = data;

    let jsonData = embedResType[selectedType]

    let slug = data.object.slug
    let contentId = data.content_id
    let contentItemUrl = "/apps/lti-tool-provider/content/article/" + slug + "/" + contentId

    jsonData['@graph'][0].title = selectedData.title
    jsonData['@graph'][0].url = contentItemUrl;

    switch (selectedType) {
      case 'LtiLinkItem':
        jsonData['@graph'][0]['@id'] = contentItemUrl;
        jsonData['@graph'][0].text = selectedData.title;
        break;
      case 'smallThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = data.image
        break;
      case 'mediumThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = data.image
        break
      case 'largeThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = data.image
        break;
    }

    console.log('SELECTED CARD DATA---->>>>>', data)
    console.log('Prepared Respose JSON -------->>>>>>>', jsonData)
  }

  selectedType = (value, itemData) => {
    this.prepareJson(value, itemData)
  }

  openArticle = (path) => {
    window.open(NEWSELA_URL + path)
  }

  render() {
    let data = this.props.jsonData

    return (
      <div className="card2">
        <div className="container-fluid py-4 mt-3 px-4">
          <Filter />
          {data && data.length > 0 ? <div className="row pb-4 pr-3" >
            {data && data.length > 0 && data.map((post, i) => (
              <div className="col-md-3 mb-3 pr-0" key={post.id}>
                <div className="card h-100 ">
                  <div className="card-body" style={{ 'cursor': 'pointer' }} onClick={() => this.openArticle(post.url)}>
                    <img src={post.image} width="100%" alt="imgage.png" />
                    <p className="card-text">{post.title}</p>
                  </div>
                  <div className="card-footer">
                    <DropDown itemData={post} selectedType={this.selectedType} />
                  </div>
                </div>
              </div>
            ))}
          </div> : this.props.isLoading ? "" : <ErrorFallback message="No Results Found!" />}
        </div>
      </div>
    )
  }
}

export default Card
