(this["webpackJsonpnewsela-embed-web-app"]=this["webpackJsonpnewsela-embed-web-app"]||[]).push([[4],{100:function(e,t){e.exports={CHECK_NODE_SERVER:"/check",ASSIGNMENT:"/assignment"}},103:function(e,t){e.exports={LtiLinkItem:{"@context":"http://purl.imsglobal.org/ctx/lti/v1/ContentItem","@graph":[{"@type":"LtiLinkItem","@id":"contentItemUrl",url:"contentItemUrl",title:"title",text:"title",mediaType:"application/vnd.ims.lti.v1.ltilink",placementAdvice:{presentationDocumentTarget:"window"}}]},smallThumbnail:{"@context":"http://purl.imsglobal.org/ctx/lti/v1/ContentItem","@graph":[{"@type":"ContentItem",url:"contentItemUrl",mediaType:"text/html",thumbnail:{"@id":"contentThumbnailImageUrl",width:147,height:184},title:"title",placementAdvice:{presentationDocumentTarget:"window"}}]},mediumThumbnail:{"@context":"http://purl.imsglobal.org/ctx/lti/v1/ContentItem","@graph":[{"@type":"ContentItem",url:"contentItemUrl",mediaType:"text/html",thumbnail:{"@id":"contentThumbnailImageUrl",width:200,height:200},title:"title",placementAdvice:{presentationDocumentTarget:"window"}}]},largeThumbnail:{"@context":"http://purl.imsglobal.org/ctx/lti/v1/ContentItem","@graph":[{"@type":"ContentItem",url:"contentItemUrl",mediaType:"text/html",thumbnail:{"@id":"contentThumbnailImageUrl",width:300,height:300},title:"title",placementAdvice:{presentationDocumentTarget:"window"}}]}}},104:function(e,t,a){e.exports=a.p+"static/media/spiner.bd30e7f1.svg"},106:function(e,t,a){"use strict";a.r(t);var n=a(105),r=a(25),o=a(26),l=a(28),c=a(27),i=a(0),s=a.n(i),u=a(43),m=a(83),d=a(73),p=a.n(d),h=(a(35),function(e){var t=e.method,a=e.url,n=e.data,r=void 0===n?null:n,o=e.authorized,l=void 0!==o&&o,c=e.headers,i={method:t,url:a,crossDomain:!0,headers:void 0===c?{"Content-Type":"application/json"}:c};return l&&(i.headers.authorization=localStorage.getItem("authorization")),r&&(i.data=r),p.a.defaults.withCredentials=!0,p()(i).catch((function(e){if(e.response)throw new Error(e)}))}),g=(a(100),a(82)),v=function(e,t){var a={};return a.url="".concat(g.SEARCH_API_URL,"?facets=true&format=full&objects=header&page=").concat(t,"&page_size=20&needle=").concat(e),a.method="get",h(a)},b=a(23),f=(a(33),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={option:!1},e.handleChange=function(t){var a=t.target.getAttribute("selectedvalue");e.props.selectedType(a,e.props.itemData),e.setState({option:!e.state.option})},e.handleClick=function(){e.setState({option:!e.state.option})},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"dropdown"},s.a.createElement("button",{className:"btn btn-primary dropdown-toggle",type:"button",onClick:function(){return e.handleClick()}},"Send"),this.state.option?s.a.createElement("div",{className:"dropdownvalue",onClick:function(t){return e.handleChange(t)}},s.a.createElement("a",{className:"dropdown-item",selectedvalue:"LtiLinkItem",value:"Send Link"},"Send Link"),s.a.createElement("a",{className:"dropdown-item",selectedvalue:"smallThumbnail",value:"Embed Small"},"Embed Small "),s.a.createElement("a",{className:"dropdown-item",selectedvalue:"mediumThumbnail",value:"Embed Medium"},"Embed Medium "),s.a.createElement("a",{className:"dropdown-item",selectedvalue:"largeThumbnail",value:"Embed Large"}," Embed Large ")):"")}}]),a}(i.Component)),E=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={option:!1},e.handleOpenOptions=function(){e.setState({option:!e.state.option})},e}return Object(o.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"filter"},s.a.createElement("button",{className:"filterbutton  dropdown-toggle",onClick:this.handleOpenOptions},"From Collections "),this.state.option?s.a.createElement("div",{className:"dropdownvalue"},s.a.createElement("p",null,"Find content from your Collections."),s.a.createElement("lable",null,s.a.createElement("input",{type:"checkbox",value:"hello"}),"Election 2020"),s.a.createElement("lable",null,s.a.createElement("input",{type:"checkbox",value:"hello"}),"Election 2021"),s.a.createElement("button",null,"Cancel"),s.a.createElement("button",null,"Apply")):null,s.a.createElement("button",{className:"filterbutton dropdown-toggle"},"Suggested For "),s.a.createElement("button",{className:"filterbutton dropdown-toggle"},"Text Level "),s.a.createElement("button",{className:"filterbutton dropdown-toggle"},"Language "))}}]),a}(i.Component),y=(a(101),a(103)),w=a.n(y),j=a(42),C=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).prepareJson=function(e,t){var a=e,n=t,r=w.a[a],o="/apps/lti-tool-provider/content/article/"+t.object.slug+"/"+t.content_id;switch(r["@graph"][0].title=n.title,r["@graph"][0].url=o,a){case"LtiLinkItem":r["@graph"][0]["@id"]=o,r["@graph"][0].text=n.title;break;case"smallThumbnail":case"mediumThumbnail":case"largeThumbnail":r["@graph"][0].thumbnail["@id"]=t.image}console.log("SELECTED CARD DATA----\x3e>>>>",t),console.log("Prepared Respose JSON --------\x3e>>>>>>",r)},n.selectedType=function(e,t){n.prepareJson(e,t)},n.openArticle=function(e){window.open(g.NEWSELA_URL+e)},n.state={showPerPage:4,search:"",selectedContent:[]},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=this.props.jsonData;return s.a.createElement("div",{className:"card2"},s.a.createElement("div",{className:"container-fluid py-4 mt-3 px-4"},s.a.createElement(E,null),t&&t.length>0?s.a.createElement("div",{className:"row pb-4 pr-3"},t&&t.length>0&&t.map((function(t,a){return s.a.createElement("div",{className:"col-md-3 mb-3 pr-0",key:t.id},s.a.createElement("div",{className:"card h-100 "},s.a.createElement("div",{className:"card-body",style:{cursor:"pointer"},onClick:function(){return e.openArticle(t.url)}},s.a.createElement("img",{src:t.image,width:"100%",alt:"imgage.png"}),s.a.createElement("p",{className:"card-text"},t.title)),s.a.createElement("div",{className:"card-footer"},s.a.createElement(f,{itemData:t,selectedType:e.selectedType}))))}))):this.props.isLoading?"":s.a.createElement(j.a,{message:"No Results Found!"})))}}]),a}(i.Component),O=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleOnInputChange=function(e){n.setState({searchKey:e}),n.props.updateValue("searchKey",e)},n.filterBasedOnSearchKey=function(e){return n.props&&n.props.jsonData&&n.props.jsonData.length>0&&n.props.jsonData.filter((function(t,a){return t.title.toLowerCase().includes(e.toLowerCase())}))},n.searchWord=function(){n.props.searchAndSave("search")},n.state={searchKey:""},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"searchmg"},s.a.createElement("div",{className:"searchbarsection"},s.a.createElement("input",{type:"text",value:this.state.searchKey,placeholder:"What do you want to teach?",onChange:function(t){return e.handleOnInputChange(t.target.value)}}),s.a.createElement("button",{className:"searchbutton",onClick:function(){return e.searchWord()}},"Search"))))}}]),a}(i.Component),S=a(104),N=a.n(S),L=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"upload-loading-img"},s.a.createElement("div",{className:"upload-loading"},s.a.createElement("img",{src:N.a,alt:"Loading..."})))}}]),a}(i.Component),A=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(r.a)(this,a);for(var o=arguments.length,l=new Array(o),c=0;c<o;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={jsonData:[],searchKey:"",currentPage:0,isLoading:!1},e.searchAndSave=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("search"==t&&e.state.searchKey.trim()||"search"!=t){var a=1;e.setState({isLoading:!0}),"loadMore"==t&&(a=e.state.currentPage+1),v(e.state.searchKey,a).then((function(r){var o;"loadMore"==t?(o=e.state.jsonData,o=[].concat(Object(n.a)(o),Object(n.a)(r.data.results))):o=r.data.results,e.setState({jsonData:o,currentPage:a,isLoading:!1}),e.props.saveResults(o)}))}},e.updateValue=function(t,a){"searchKey"==t&&e.setState({searchKey:a})},e.loadMore=function(){e.searchAndSave("loadMore")},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.saveQueryParamsOnLaunch(Object(m.parseQuery)(this.props.location.search)),this.searchAndSave()}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(O,{searchAndSave:this.searchAndSave,updateValue:this.updateValue,jsonData:this.props.jsonData}),s.a.createElement(C,{isLoading:this.state.isLoading,jsonData:this.state.jsonData}),this.state.jsonData&&0==this.state.jsonData.length?"":s.a.createElement("button",{className:"load-more-button",onClick:function(){return e.loadMore()}},"Show More Results"),this.state.isLoading?s.a.createElement(L,null):"")}}]),a}(i.Component);var k=Object(u.b)((function(e){return{jsonData:e.rootReducer.mainReducer.resultsData}}),(function(e){return{saveQueryParamsOnLaunch:function(t){return e(function(e){return{type:b.SAVE_QUERY_PARAMS,payload:e}}(t))},saveResults:function(t){return e(function(e){return{type:b.SAVE_RESULTS,payload:e}}(t))}}}))(A);t.default=k},82:function(e,t){e.exports={CHECK_NODE_SERVER:"http://localhost:4000",SEARCH_API_URL:"https://search.newsela.com/v1",ASSIGNMENT_API_URL:"https://newsela.com/api/v1",NEWSELA_URL:"http://newsela.com"}},83:function(e,t){e.exports={readCookie:function(e){for(var t=e+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var r=a[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null},parseQuery:function(e){for(var t={},a=("?"===e[0]?e.substr(1):e).split("&"),n=0;n<a.length;n++){var r=a[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"")}return t}}}}]);
//# sourceMappingURL=4.81f20dc1.chunk.js.map