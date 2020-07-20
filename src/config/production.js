
const SEARCH_API_CONFIG = {
    API_SEARCH_ENDPOINT:  'https://search.newsela.com/v1/',
    API_DEFAULT_PARAM: [
      {'facets': true},
      {'format':  'full'},
      {'objects': 'header'},
      {'page_size':  '12'},
      {'page':  '1'},
    ]
};

const COLLECTION_API_CONFIG = {
    API_SEARCH_ENDPOINT:  'https://newsela.com/api/v2/collection',
};

export default {
    ENV: 'Prod',
    API_BASE_URL:'http://localhost:4000',
    SEARCH_API_CONFIG,
    COLLECTION_API_CONFIG,
};
