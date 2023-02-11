import { CATALOG_LIST_FAIL, CATALOG_LIST_REQUEST, CATALOG_LIST_SUCCESS } from "./catalogActions"

const catalogReducer = (state = { catalog: [], filter: [] }, action) => {
    switch (action.type) {
      case CATALOG_LIST_REQUEST:
        return { loading: true, catalog: [] }
      case CATALOG_LIST_SUCCESS:
        return {
          loading: false,
          catalog: action.payload,
        }
      case CATALOG_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export default catalogReducer