import axios from "axios";
export const FETCH_NOTE = 'FETCH_NOTE'

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