import axios from "axios"

export const POST__ADD = 'POST__ADD'
export const POST__UPDATE = 'POST__UPDATE'
export const POST__DELETE = 'POST__DELETE'
export const GET_POST_EDIT = 'GET_POST_EDIT'
export const POST_SEARCH = 'POST_SEARCH'
export const RESET__SUCCESS = 'RESET__SUCCESS'
export const FETCH_DATA = 'FETCH_DATA'


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
export const AddPostAction = (postInputData) => {
    return {
        type: POST__ADD,
        postInputData,
    }
}

export const UpdatePostAction = (editPostData) => {
    return {
        type: POST__UPDATE,
        editPostData,
    }
}
export const DeletePostAction = (postId) => {
    return {
        type: POST__DELETE,
        postId,
    }
}
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


