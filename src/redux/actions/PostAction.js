import axios from "axios"
export const POST_ADD = 'POST_ADD'
export const POST_UPDATE = 'POST_UPDATE'
export const POST_DELETE = 'POST_DELETE'
export const GET_POST_EDIT = 'GET_POST_EDIT'
export const POST_SEARCH = 'POST_SEARCH'
export const RESET_SUCCESS = 'RESET_SUCCESS'
export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_REQUSET = 'FETCH_REQUSET'
export const POSTING_SUCCESS = 'POSTING_SUCCESS'
export const POSTING_FAILURE = 'POSTING_FAILURE'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'
export const GET_POST_TYPE = 'GET_POST_TYPE'

const VITE_POSTS_BIN_IDS = import.meta.env.VITE_POSTS_BIN_IDS.split(',');
const X_MASTER_KEY = import.meta.env.VITE_X_MASTER_KEY;

export const fetchData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_REQUSET });

        const allPosts = [];
        const binSizes = [];

        const BIN_IDS = import.meta.env.VITE_POSTS_BIN_IDS.split(',');
        const X_MASTER_KEY = import.meta.env.VITE_X_MASTER_KEY;

        try {
            for (const binId of BIN_IDS) {
                const response = await axios.get(
                    `https://api.jsonbin.io/v3/b/${binId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Master-Key": X_MASTER_KEY,
                        },
                    }
                );

                const record = response.data.record;
                const posts = record.posts || [];

                const sizeKB = new TextEncoder().encode(JSON.stringify(record)).length / 1024;

                // Lấy danh sách các postId hợp lệ
                const postIds = posts
                    .map((post) => parseInt(post.postId, 10))
                    .filter((id) => !isNaN(id));

                const startPostId = postIds.length > 0 ? Math.min(...postIds) : null;
                const endPostId = postIds.length > 0 ? Math.max(...postIds) : null;

                binSizes.push({ sizeKB, startPostId, endPostId });

                allPosts.push(...posts);
            }

            dispatch({
                type: FETCH_DATA,
                payload: {
                    posts: allPosts,
                    binSizes: binSizes,
                },
            });
        } catch (error) {
            dispatch({
                type: FETCH_DATA,
                payload: {
                    posts: [],
                    binSizes: [],
                    error: error.message,
                },
            });
        }
    };
};

const fetchExistingPosts = async (binId) => {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": X_MASTER_KEY,
        },
    });
    return response.data.record;
};
const updatePostsInBin = async (binId, updatedPosts) => {
    const response = await axios.put(
        `https://api.jsonbin.io/v3/b/${binId}`,
        updatedPosts,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": X_MASTER_KEY,
            },
        }
    );
    return response.data.record;
};
export const AddPostAction = (binIndex, newPosts) => async (dispatch, getState) => {
    const binId = VITE_POSTS_BIN_IDS[binIndex];
    if (!binId) {
      dispatch({
        type: POSTING_FAILURE,
        payload: `Invalid bin index: ${binIndex}`,
      });
      return;
    }
  
    try {
      const existingPosts = await fetchExistingPosts(binId);
      const posts = existingPosts.posts || [];
  
      // Đoạn này được thay đổi để tính nextPostsId phù hợp
      let nextPostsId = 1;
  
      if (posts.length > 0) {
        // Nếu bin hiện tại có dữ liệu, tìm postId lớn nhất rồi +1
        const existingPostsId = posts.map((post) => parseInt(post.postId, 10));
        nextPostsId = Math.max(...existingPostsId) + 1;
      } else if (binIndex > 0) {
        // Nếu bin rỗng, lấy postId cuối cùng của bin trước đó
        const { binSizes } = getState().PostReducer;
        const prevEnd = parseInt(binSizes[binIndex - 1]?.endPostId, 10);
        if (!isNaN(prevEnd)) {
          nextPostsId = prevEnd + 1;
        }
      }
  
      const postsWithId = {
        ...newPosts,
        postId: nextPostsId.toString(),
      };
  
      posts.push(postsWithId);
      const updatedData = { ...existingPosts, posts };
      const updateResponse = await updatePostsInBin(binId, updatedData);
  
      dispatch({
        type: POSTING_SUCCESS,
        payload: updateResponse,
      });
  
      dispatch(fetchData()); // Gọi lại fetchData sau khi thêm
    } catch (error) {
      dispatch({
        type: POSTING_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
  
export const UpdatePostAction = (binIndex, editPostData) => async (dispatch) => {
    const binId = VITE_POSTS_BIN_IDS[binIndex];
    if (!binId) {
        dispatch({
            type: POSTING_FAILURE,
            payload: `Invalid bin index: ${binIndex}`,
        });
        return;
    }
    try {
        const existingPosts = await fetchExistingPosts(binId);
        const posts = existingPosts.posts || [];
        const postIndex = posts.findIndex(post => post.postId === editPostData.postId);
        if (postIndex === -1) {
            throw new Error("Post not found.");
        }
        posts[postIndex] = {
            ...posts[postIndex],
            ...editPostData,
        };
        const updatedData = { ...existingPosts, posts };
        const updateResponse = await updatePostsInBin(binId, updatedData);
        dispatch({
            type: UPDATE_SUCCESS,
            payload: updateResponse,
        });
        dispatch(fetchData());
    } catch (error) {
        dispatch({
            type: UPDATE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const DeletePostAction = (binIndex, postId) => async (dispatch, getState) => {
    const binId = VITE_POSTS_BIN_IDS[binIndex];
    if (!binId) {
        dispatch({
            type: POSTING_FAILURE,
            payload: `Invalid bin index: ${binIndex}`,
        });
        return;
    }
    try {
        const existingPosts = await fetchExistingPosts(binId);
        const posts = existingPosts.posts || [];
        // Lọc ra các post không bị xóa
        const newPosts = posts.filter(post => post.postId !== postId);
        // Lấy postId bắt đầu: nếu binIndex === 1 → lấy từ bin 0
        let startPostId = 1;
        if (binIndex > 0) {
            const { binSizes } = getState().PostReducer;
            const previousBin = binSizes[binIndex - 1];
            const endPostId = parseInt(previousBin?.endPostId, 10);
            startPostId = isNaN(endPostId) ? 1 : endPostId + 1;
        }
        // Gán lại postId bắt đầu từ startPostId
        const updatedPosts = newPosts.map((post, index) => ({
            ...post,
            postId: (startPostId + index).toString(),
        }));
        const updatedData = { ...existingPosts, posts: updatedPosts };
        const updateResponse = await updatePostsInBin(binId, updatedData);
        dispatch({
            type: DELETE_SUCCESS,
            payload: updateResponse,
        });
        dispatch(fetchData());
    } catch (error) {
        dispatch({
            type: DELETE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const GetPostAction = (postId) => {
    return {
        type: GET_POST_EDIT,
        postId,
    }
}
export const ResetSuccess = () => {
    return {
        type: RESET_SUCCESS,
    }
}
export const SearchPostAction = (searchText) => {
    return {
        type: POST_SEARCH,
        searchText,
    }
}