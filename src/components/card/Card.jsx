import React, { Component } from 'react'
import DropDown from '../dropdown'
import Filter from '../filter'
import * as _ from 'lodash'
import embedResType from '../../utils/embedResTypes'
import ErrorFallback from '../errorFallback/ErrorFallback';
import { NEWSELA_URL } from '../../constants/urls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThLarge,faThList}  from '@fortawesome/free-solid-svg-icons'

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

  handleChangeViewList = () =>{
    this.setState({
      changeView:true
    })
  }
  handleChangeViewGrid = () =>{
    this.setState({
      changeView:false
    })
  }


  render() {
    let data = this.props.jsonData
    let {changeView}= this.state;
    const filterList = this.props.filterList;
    const callFilter = this.props.callFilter;
    return (
      <div className="card2">
        <div className="container-fluid py-4 mt-3 px-4">
         <div className="row px-3 list-grid">
            <div className="co-md-8">
                 <Filter filterList={filterList} callFilter={callFilter} />
            </div>
            <div className="co-md-4">
            <FontAwesomeIcon icon={faThLarge} onClick={this.handleChangeViewGrid}  className={`grid ${changeView?'':'active'}`}/>
            <FontAwesomeIcon icon={faThList} onClick={this.handleChangeViewList} className={`list ${changeView?'active':''}`} />
            </div>
          </div>
          {data && data.length > 0 ? <div className="row pb-4 pr-3" >
            {data && data.length > 0 && data.map((post, i) => (
              <div className={`mb-3 pr-0 ${changeView?'col-md-6':'col-md-3'}`} key={post.id}>
                <div className={`card h-100 ${changeView?'p-3':''}`} >
                  <div className={`h-100 ${changeView?'row list-wrap':''}`}  style={{ 'cursor': 'pointer' }} onClick={() => this.openArticle(post.url)}>
                      <div className={`${changeView?'col-md-4 pr-0':''}`}>
                        <img src={post.image} width="100%" alt="imgage.png" />
                      </div>
                    <div className={`${changeView?'col-md-8':'card-body'}`} >
                       
                       <p className="card-text">{post.title}</p>
                    </div>
                   </div>
                  <div className={`${changeView?'list-footer':'card-footer'}`}>
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
