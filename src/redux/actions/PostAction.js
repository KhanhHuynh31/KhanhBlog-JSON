import axios from "axios"

export const POST__ADD = 'POST__ADD'
export const POST__UPDATE = 'POST__UPDATE'
export const POST__DELETE = 'POST__DELETE'
export const GET_POST_EDIT = 'GET_POST_EDIT'
export const POST_SEARCH = 'POST_SEARCH'
export const RESET__SUCCESS = 'RESET__SUCCESS'
export const FETCH_DATA = 'FETCH_DATA'
export const POSTING_SUCCESS = 'POSTING_SUCCESS'
export const POSTING_FAILURE = 'POSTING_FAILURE'

export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'


export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

const BIN_ID = "67f4d3868561e97a50fad9ba";
const X_MASTER_KEY =
    "$2a$10$pSHuOZVPA7JH20w31fABbeHjnUc/tZPJNVadteRITlYzOjwVP6Fli";

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `https://api.jsonbin.io/v3/b/${BIN_ID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": X_MASTER_KEY,
                    },
                }
            );
            const posts = response.data.record.posts;
            dispatch({ type: FETCH_DATA, payload: posts });
        } catch (error) {
            dispatch({ type: FETCH_DATA, payload: error.message });
        }
    };
};
const fetchExistingPosts = async () => {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": X_MASTER_KEY,
        },
    });
    return response.data.record;
};
const updatePostsInBin = async (updatedPosts) => {
    const response = await axios.put(
        `https://api.jsonbin.io/v3/b/${BIN_ID}`,
        updatedPosts,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": X_MASTER_KEY,
            },
        }
    );
    return response.data;
};
export const AddPostAction = (newPosts) => async (dispatch) => {
    try {
        dispatch({ type: POST__ADD });
        const existingPosts = await fetchExistingPosts();
        const posts = existingPosts.posts || [];
        
        const existingPostsId = posts.map((post) => parseInt(post.postId, 10));
        const nextPostsId = existingPostsId.length > 0 ? Math.max(...existingPostsId) + 1 : 1;
        
        const postsWithId = {
            ...newPosts,
            postId: nextPostsId.toString(),
        };
        
        posts.push(postsWithId);
        const updatedData = { ...existingPosts, posts };
        const updateResponse = await updatePostsInBin(updatedData);

        dispatch({
            type: POSTING_SUCCESS,
            payload: updateResponse,
        });
    } catch (error) {
        dispatch({
            type: POSTING_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const UpdatePostAction = (editPostData) => async (dispatch) => {
    try {
        dispatch({ type: POST__UPDATE });
        const existingPosts = await fetchExistingPosts();
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
        const updateResponse = await updatePostsInBin(updatedData);

        dispatch({
            type: UPDATE_SUCCESS,
            payload: updateResponse,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const DeletePostAction = (postId) => async (dispatch) => {
    try {
        dispatch({ type: POST__DELETE });
        const existingPosts = await fetchExistingPosts();
        const posts = existingPosts.posts || [];
        
        const newPosts = posts.filter(post => post.postId !== postId);
        const updatedData = { ...existingPosts, posts: newPosts };
        const updateResponse = await updatePostsInBin(updatedData);

        dispatch({
            type: DELETE_SUCCESS,
            payload: updateResponse,
        });
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
        type: RESET__SUCCESS,
    }
}
export const SearchPostAction = (searchText) => {
    return {
        type: POST_SEARCH,
        searchText,
    }
}


