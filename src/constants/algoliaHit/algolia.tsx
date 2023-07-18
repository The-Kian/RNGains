import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = 'KY58WR8FMC'
const ALGOLIA_SEARCH_ONLY_API_KEY = 'c97be3eb043f2e95cb057e2c0d60f69a'

export const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY)