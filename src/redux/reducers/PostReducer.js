import {
  FETCH_DATA,
  POSTING_SUCCESS,
  POSTING_FAILURE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  RESET_SUCCESS,
  GET_POST_EDIT,
  POST_SEARCH,
  FETCH_REQUSET,
} from '../actions/PostAction';

const initialState = {
  loading: false,
  success: false,
  error: null,
  binSizes: [],
  posts: [],
  postEdit: {},
  postSearch: [],
  postTypes: [],
  postTags: []
};

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUSET: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_DATA: {
      const postType = action.payload.posts.map(post => post.postType);
      const postTag = action.payload.posts
        .flatMap(post => post.postTags.split(',').map(tag => tag.trim())) // Split and trim
        .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
      return {
        ...state,
        posts: action.payload.posts,
        postSearch: action.payload.posts,
        postTypes: [...new Set(postType)],
        postTags: [...new Set(postTag)],
        loading: false,
        binSizes: action.payload.binSizes
      };
    }
    //POSTING
    case POSTING_SUCCESS: {
      return {
        ...state,
        success: true,
      };
    }
    case POSTING_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    //UPDATE
    case UPDATE_SUCCESS: {
      return {
        ...state,
        success: true,
      };
    }
    case UPDATE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    //DELETE
    case DELETE_SUCCESS: {
      return {
        ...state,
        success: true,
      };
    }
    case DELETE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    //ULTILIZATION
    case RESET_SUCCESS: {
      return {
        ...state,
        error: null,
        success: false,
      };
    }
    case GET_POST_EDIT: {
      let postToEdit = state.posts.find(
        (post) => post.postId === action.postId
      );
      return {
        ...state,
        postEdit: postToEdit || {},
      };
    }

    case POST_SEARCH: {
      try {
        // Create a safe search pattern
        const searchPattern = new RegExp(action.searchText, "i");

        // Filter posts that match the search pattern
        const listSearch = state.posts.filter((post) =>
          Object.values(post).some(
            (val) => typeof val === "string" && searchPattern.test(val)
          )
        );

        // Return completely new state object
        return {
          ...state,
          postSearch: listSearch.length >= 1 ? listSearch : [...state.posts],
        };
      } catch (error) {
        return {
          ...state,
          postSearch: [...state.posts],
          error: error.message
        };
      }
    }
    default:
      return { ...state };
  }
};
