module.exports = {
    'LtiLinkItem': {
        "@type": "LtiLinkItem",
        "mediaType": "application/vnd.ims.lti.v1.ltilink",
        "icon": {
            "@id": "https://www.server.com/path/animage.png",
            "width": 50,
            "height": 50
        },
        "title": "Week 1 reading",
        "text": "Read this section prior to your tutorial.",
        "available": {
            "startDatetime": "2016-10-31T19:20:30Z",
            "endDatetime": "2016-12-01T00:00:00Z"
        },
        "custom": {
            "chapter": "12",
            "section": "3"
        }
    },
    'ContentItem':{
        "@type" : "ContentItem",
        "url" : "http://imscatalog.org/",
        "mediaType" : "text/html",
        "thumbnail" : {
          "@id" : "http://developers.imsglobal.org/images/imscertifiedsm.png",
          "width" : 147,
          "height" : 184
        },
        "title" : "IMS catalog of certified products",
        "hideOnCreate" : true,
        "available" : {
          "startDatetime" : "2016-10-31T19:20:30Z",
          "endDatetime" : "2017-10-31T19:20:30Z"
        },
        "placementAdvice" : {
          "presentationDocumentTarget" : "window",
          "windowTarget" : "_blank"
        }
      }
}