const initialState = {
  loading: false,
  success: 0,
  posts: [],
  error: null,
  postEdit: {},
  postSearch: [],
};

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA": {
      console.log(action.posts);
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "POST__ADD": {
      return {
        ...state,
        posts: [...state.posts, action.postInputData],
      };
    }

    case "POST__UPDATE": {
      return {
        ...state,
        posts: action.payload,

      };
    }

    case "POST__DELETE": {
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.postId),
        postSearch: state.postSearch.filter(post => post.postId !== action.postId),
        success: state.success + 1
      };
    }
    case "RESET__SUCCESS": {
      return {
        ...state,
        success: 0
      };
    }
    case "GET_POST_EDIT": {
      let postToEdit = state.posts.find(
        (post) => post.postId === action.postId
      );
      return {
        ...state,
        postEdit: postToEdit || {},
      };
    }

    case "POST_SEARCH": {
      try {
        // Create a safe search pattern
        const searchPattern = new RegExp(action.searchText, 'i');

        // Filter posts that match the search pattern
        const listSearch = state.posts.filter(post =>
          Object.values(post).some(val =>
            typeof val === "string" && searchPattern.test(val)
          )
        );

        // Return completely new state object
        return {
          ...state,
          postSearch: listSearch.length >= 1 ? listSearch : [...state.posts]
        };
      } catch (error) {
        console.error("Search error:", error);
        return {
          ...state,
          postSearch: [...state.posts]
        };
      }
    }

    default:
      return { ...state };
  }
};
