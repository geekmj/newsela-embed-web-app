import React, { Component } from 'react'
import DropDown from '../dropdown'
import Filter from '../filter'
import { get } from 'lodash'
import config from '../../config'
import embedResType from '../../utils/embedResTypes'
import ErrorFallback from '../errorFallback/ErrorFallback';
import { NEWSELA_URL } from '../../constants/urls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons'
import Quizicon from '../../assets/images/Quiz-icon.png'
import Essentials from '../../assets/images/Essentials.png'

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

  handleHiddenForm = (preparedJson) => {

    //Set hidden form parameters value and subit the form
    let hiddenForm = document.getElementById('responseForm');
    let resonseJsonContentItems = document.getElementById('content_items');
    let responseJsonContentId = document.getElementById('request_id');

    resonseJsonContentItems.value = JSON.stringify(preparedJson);
    responseJsonContentId.value = this.props.queryParms && this.props.queryParms.request_id;

    hiddenForm.submit();

  }

  prepareJson = (selectedType, selectedData) => {

    let jsonData = embedResType[selectedType]

    let slug = selectedData.object.slug
    let contentId = selectedData.content_id
    let contentItemUrl = "/apps/lti-tool-provider/content/article/" + slug + "/" + contentId

    let graph = get(jsonData, "['@graph'][0]")
    let thumbnail = get(jsonData, "['@graph'][0].thumbnail['@id']")


    graph.title = selectedData.title
    graph.url = contentItemUrl;

    switch (selectedType) {
      case 'LtiLinkItem':
        jsonData['@graph'][0]['@id'] = contentItemUrl;
        jsonData['@graph'][0].text = selectedData.title;
        break;
      case 'smallThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = selectedData.image
        break;
      case 'mediumThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = selectedData.image
        break
      case 'largeThumbnail':
        jsonData['@graph'][0].thumbnail['@id'] = selectedData.image
        break;
    }

    this.handleHiddenForm(jsonData)

    console.log('SELECTED CARD DATA---->>>>>', selectedData)
    console.log('Prepared Respose JSON -------->>>>>>>', jsonData)
  }

  selectedType = (value, itemData) => {
    this.prepareJson(value, itemData)
  }

  openArticle = (path) => {
    window.open(NEWSELA_URL + path)
  }

  handleChangeViewList = () => {
    this.setState({
      changeView: true
    })
  }

  handleChangeViewGrid = () => {
    this.setState({
      changeView: false
    })
  }

  responseForm = () => {
    return <form id="responseForm" action={config.RETURN_URL} method="post">
      <input type="hidden" name="content_items" id="content_items" value="" />
      <input type="hidden" name="request_id" id="request_id" value="" />
    </form>
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
        <div className="container-fluid pt-4 mt-3 px-4">
          <div className="row px-3 pt-2 list-grid">
            <div className="co-md-8">
                 <Filter filterList={filterList} callFilter={callFilter} />
            </div>
            <div className="co-md-4">
              <FontAwesomeIcon icon={faThLarge} onClick={this.handleChangeViewGrid} className={`grid ${changeView ? '' : 'active'}`} />
              <FontAwesomeIcon icon={faThList} onClick={this.handleChangeViewList} className={`list ${changeView ? 'active' : ''}`} />
            </div>
            
          </div>
          {this.responseForm()}
          {data && data.length > 0 ? <div className="row pb-3 pr-3" >
            {data && data.length > 0 && data.map((post, i) => (
              <div className={`mb-4 pr-0 ${changeView ? 'col-md-6' : 'col-md-3'}`} key={post.id}>
                <div className={`card h-100 ${changeView ? 'p-3' : ''}`} >
                  <div className={`h-100 ${changeView ? 'row list-wrap' : ''}`} style={{ 'cursor': 'pointer' }} onClick={() => this.openArticle(post.url)}>
                    <div className={`${changeView ? 'col-md-4 pr-0' : ''}`}>
                      <img src={post.image} width="100%" alt="imgage.png" />
                    </div>
                    <div className={`${changeView ? 'col-md-8' : 'card-body pt-3'}`} >
                      <h6 className="card-title text-uppercase mb-3">{post.display_category}</h6>
                      <p className={`${changeView ? 'list-text' : 'card-text'}`}>{post.title}</p>
                    </div>
                  </div>
                  <div className={`${changeView ? 'list-footer' : 'card-footer'}`}>
                     <div className={`${changeView ? 'list-icon' : ''}`}>
                       <img src={Quizicon} width="20px" height="17px"alt="quizicon" />
                       <img src={Essentials} width="20px" height="17px"alt="quizicon" />
                    </div>
                    <div>
                       <DropDown itemData={post} selectedType={this.selectedType} />
                    </div>
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
