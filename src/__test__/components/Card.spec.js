import React from 'react'
import { mount } from 'enzyme';
import Card from './../../components/card';
let data = {
    "content_id": "ckbl431d80aiaa4mavuhrunnf",
    "date_published": "2020-06-18T18:22:17+00:00",
    "display_category": "Kids",
    "id": 2000000332,
    "image": "https://nails.newsela.com/s3/newsela-media-dev/article_media/test-images/2000000332.jpg?crop=0%2C0%2C1366%2C825&height=282&horizontal_focal_point=center&vertical_focal_point=center&width=467",
    "license_tier": "free",
    "object": {
        "categories": [
            {
                "display_name": "Kids",
                "short_name": "Kids",
                "slug": "kids"
            }
        ],
        "collections": [

        ],
        "content_maturities": [
            "Upper Elementary School",
            "Middle School",
            "High School"
        ],
        "content_provider": {
            "slug": "newsela-sre"
        },
        "features": [

        ],
        "hero_image": "https://nails.newsela.com/s3/newsela-media-dev/article_media/test-images/2000000332.jpg?crop=0%2C0%2C1366%2C825&height=664&horizontal_focal_point=center&vertical_focal_point=center&width=1100",
        "image_caption": "",
        "language": "en",
        "reading_skills": [
            "cc5",
            "teks4",
            "cc6",
            "teks5",
            "cc7",
            "teks6"
        ],
        "short_title": "Produce watch worry",
        "slug": "kitchen-sink",
        "social_tags": [

        ],
        "story": {
            "id": 2000000322,
            "type": "editorial"
        },
        "tags": [
            {
                "value": "news:kids"
            }
        ],
        "thumbnail_image": "https://nails.newsela.com/s3/newsela-media-dev/article_media/test-images/2000000332.jpg?crop=0%2C0%2C1366%2C825&height=50&horizontal_focal_point=center&vertical_focal_point=center&width=50",
        "translations": [
            {
                "display_language": "Spanish",
                "id": 2000000333,
                "language": "es",
                "slug": "kitchen-sink-spanish",
                "url": "/read/kitchen-sink-spanish"
            }
        ],
        "user_level_article": {
            "id": 2000001528
        }
    },
    "score": null,
    "title": "Produce watch worry machine thousand, Grade 12",
    "type": "header",
    "url": "/read/kitchen-sink"
}

let preparedJSON = {
    '@context': 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
    '@graph': [
        {
            '@type': 'ContentItem',
            url: 'undefined/read/kitchen-sink',
            mediaType: 'text/html',
            thumbnail: [
                Object
            ],
            title: 'Produce watch worry machine thousand, Grade 12',
            placementAdvice: [
                Object
            ]
        }
    ]
}

describe("Card component", () => {
    let wrapper;
    let prop = {
        queryParms: {
            request_id: "abc"
        }
    }


    beforeEach(() => {
        wrapper = mount(<Card {...prop} />);
    });
    it("render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    })
    it("testcase for openArticle",()=>{
        let path ="/read/kitchen-sink"
        wrapper.instance().openArticle(path);
    })
    it("testcase for handleChangeViewList",()=>{
        wrapper.instance().handleChangeViewList();
        expect(wrapper.instance().state.changeView).toBe(true)
    })

    it("testcase for handleChangeViewGrid",()=>{
        wrapper.instance().handleChangeViewGrid();
        expect(wrapper.instance().state.changeView).toBe(false)
    })
})
