import axios from "axios";
export const FETCH_NOTE = 'FETCH_NOTE'
export const GET_NOTE_EDIT = 'GET_NOTE_EDIT'
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS'
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE'
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS'
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE'
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE'
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS'
export const RESET_NOTE_SUCCESS = 'RESET_NOTE_SUCCESS'

const VITE_NOTE_BIN_ID = import.meta.env.VITE_NOTE_BIN_ID;
const X_MASTER_KEY = import.meta.env.VITE_X_MASTER_KEY;

export const fetchNoteData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `https://api.jsonbin.io/v3/b/${VITE_NOTE_BIN_ID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": X_MASTER_KEY,
                    },
                }
            );
            const note = response.data.record.note;
            dispatch({ type: FETCH_NOTE, payload: note });
        } catch (error) {
            dispatch({ type: FETCH_NOTE, payload: error.message });
        }
    };
};
const fetchExistingData = async () => {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${VITE_NOTE_BIN_ID}`, {
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": X_MASTER_KEY,
        },
    });
    return response.data.record;
};
const updateBinData = async (updatedPosts) => {
    const response = await axios.put(
        `https://api.jsonbin.io/v3/b/${VITE_NOTE_BIN_ID}`,
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
export const AddNoteAction = (newData) => async (dispatch) => {
    try {
        const existingPosts = await fetchExistingData();
        const note = existingPosts.note || [];
        note.push(newData);
        const updatedData = { ...existingPosts, note };
        const updateResponse = await updateBinData(updatedData);
        dispatch({
            type: ADD_NOTE_SUCCESS,
            payload: updateResponse,
        });
    } catch (error) {
        dispatch({
            type: ADD_NOTE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const DeleteNoteAction = (id) => async (dispatch) => {
    try {
        const existingData= await fetchExistingData();
        const data = existingData.note || [];
        const newData = data.filter(note => note.note_id !== id);
        const updatedData = newData.map((note, index) => ({
            ...note,
            note_id: (index + 1).toString(),
        }));
        const updatedDataList = { ...existingData, note: updatedData };
        const updateResponse = await updateBinData(updatedDataList);
        dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: updateResponse,
        });
    } catch (error) {
        dispatch({
            type: DELETE_NOTE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const UpdateNoteAction = (propsData) => async (dispatch) => {
    try {
        const existingData= await fetchExistingData();
        const data = existingData.note || [];
        const newData = data.findIndex(item => item.note_id == propsData.note_id);
        if (newData === -1) {
            throw new Error("Data not found.");
        }
        data[newData] = {
            ...data[newData],
            ...propsData,
        };
        const updatedDataList = { ...existingData, note: data };
        const updateResponse = await updateBinData(updatedDataList);
        dispatch({
            type: UPDATE_NOTE_SUCCESS,
            payload: updateResponse,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_NOTE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};
export const GetNoteAction = (id) => {
    return {
        type: GET_NOTE_EDIT,
        payload: id,
    }
}
export const ResetNoteAction = () => {
    return {
        type: RESET_NOTE_SUCCESS,
    }
}