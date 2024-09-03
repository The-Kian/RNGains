import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = 'KY58WR8FMC'
const ALGOLIA_SEARCH_ONLY_API_KEY = '269328bc01fcc2181ca1eb8ba0dea089'

export const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY)