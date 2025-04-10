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
      return {
        ...state,
        posts: action.payload,
        postSearch: action.payload
      };
    }
    case "POSTING_SUCCESS": {
      return {
        ...state,
        posts: action.payload.posts,
        postSearch: action.payload.posts

      };
    }
    case "POSTING_FAILURE": {
      alert("error");
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "POST__UPDATE": {
      return {
        ...state,
        posts: action.payload,

      };
    }

    case "DELETE_SUCCESS": {
      return {
        ...state,
        posts: action.payload.posts,
        postSearch: action.payload.posts
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
