import React, { Component } from "react";
import DropDown from "../dropdown";
import { set } from "lodash";
import embedResType from "../../utils/embedResTypes";
import ErrorFallback from "../errorFallback/ErrorFallback";
import "./Card.css";
import Spanish from "../../assets/images/Spanish.svg";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedContent: [],
    };
  }

  handleHiddenForm = (preparedJson) => {
    //Set hidden form parameters value and subit the form
    let hiddenForm = document.getElementById("responseForm");
    let resonseJsonContentItems = document.getElementById("content_items");
    let responseJsonContentId = document.getElementById("request_id");

    resonseJsonContentItems.value =JSON.stringify(preparedJson);
    responseJsonContentId.value =
      this.props.queryParams && this.props.queryParams.request_id
        ? decodeURIComponent(this.props.queryParams.request_id)
        : "NO_REQUEST_ID";

    hiddenForm.submit();
  };

  prepareJson = (selectedType, selectedData) => {
    let jsonData = embedResType[selectedType];

    let slug = selectedData.object.slug;
    let contentId = selectedData.content_id;
    let contentItemUrl = process.env.REACT_APP_NEWSELA_URL + "/apps/lti-tool-provider/content/article/" + slug + "/" + contentId + "/";

    set(jsonData, "['@graph'][0].title", selectedData.title);
    set(jsonData,"['@graph'][0].url", contentItemUrl);
    set(jsonData, "['@graph'][0]['@id']", contentItemUrl);
    set(jsonData, "['@graph'][0].text", selectedData.title);

    switch (selectedType) {
      // case "LtiLinkItem":
      //   set(jsonData, "['@graph'][0]['@id']", contentItemUrl);
      //   set(jsonData, "['@graph'][0].text", selectedData.title);
      //   break;
      case "smallThumbnail":
        set(jsonData, "['@graph'][0].thumbnail['@id']", selectedData.image);
        break;
      case "mediumThumbnail":
        set(jsonData, "['@graph'][0].thumbnail['@id']", selectedData.image);
        break;
      case "largeThumbnail":
        set(jsonData, "['@graph'][0].thumbnail['@id']", selectedData.image);
        break;
      default:
        break;
    }
    this.handleHiddenForm(jsonData)

    console.log('SELECTED CARD DATA---->>>>>', JSON.stringify(selectedData))
    console.log('Prepared Respose JSON -------->>>>>>>', JSON.stringify(jsonData))
  };

  selectedType = (value, itemData) => {
    this.prepareJson(value, itemData);
  };

  openArticle = (path) => {
    let queryparam = this.props.queryParams && this.props.queryParams.product_family;
    window.open(
      process.env.REACT_APP_NEWSELA_URL +
      path + "?preview_for=" + (queryparam)
    );
  };

  handleChangeViewList = () => {
    this.setState({
      changeView: true,
    });
  };

  handleChangeViewGrid = () => {
    this.setState({
      changeView: false,
    });
  };

  responseForm = () => {
    return (
      <form
        id="responseForm"
        action={process.env.REACT_APP_RETURN_URL}
        method="post"
      >
        <input type="hidden" name="content_items" id="content_items" value="" />
        <input type="hidden" name="request_id" id="request_id" value="" />
      </form>
    );
  };

  render() {
    let data = this.props.jsonData;
    const changeView = this.props.changeView;

    return (
      <div>
        {this.responseForm()}
        {data && data.length > 0 ? (
          <div className="row pb-3 pr-3">
            {data &&
              data.length > 0 &&
              data.map((post, i) => (
                <div
                  className={`mb-4 pr-0 ${
                    changeView ? "col-md-6" : "col-md-3"
                    }`}
                  key={post.id}
                >
                  <div className={`card h-100 ${changeView ? "p-3" : ""}`}>
                    <div
                      className={`h-100 ${changeView ? "row list-wrap" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.openArticle(post.url)}
                    >
                      <div className={`${changeView ? "col-md-4 pr-0" : ""}`}>
                        <img src={post.image} width="100%" alt="imgage.png" />
                      </div>
                      <div
                        className={`${
                          changeView ? "col-md-8" : "card-body pt-3"
                          }`}
                      >
                        <h6 className="card-title text-uppercase mb-3">
                          {post.display_category}
                        </h6>
                        <p
                          className={`${
                            changeView ? "list-text" : "card-text"
                            }`}
                        >
                          {post.title}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        changeView ? "list-footer" : "card-footer"
                        }`}
                    >
                      <div id
                        className={`${changeView ? "list-icon" : ""}`}
                        onClick={() => this.openArticle(post.url)}
                      >
                        {(post &&
                          Object.keys(post["object"]).length > 0 &&
                          post["object"]["translations"] &&
                          post["object"]["translations"].length > 0 &&
                          post["object"]["translations"][0].display_language ===
                          "Spanish") || (post["object"].language === "es") ? (
                            <div className="tool">
                              <img
                                src={Spanish}
                                width="15px"
                                height="15px"
                                alt="spanish-icon"
                              />
                              <span className="tooltiptext"> Also available in Spanish</span>
                            </div>
                          ) : (
                            ""
                          )}
                      </div>
                      <div>
                        <DropDown
                          itemData={post}
                          selectedType={this.selectedType}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : this.props.isLoading ? (
          ""
        ) : (
              <ErrorFallback message="No Results Found!" />
            )}
      </div>
    );
  }
}

export default Card;