import {
  FETCH_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  GET_NOTE_EDIT,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  RESET_NOTE_SUCCESS,
  PIN_NOTE_CHANGE,
} from '../actions/NoteAction';
let pinDataStorage =[];
if (localStorage.getItem(PIN_NOTE_CHANGE)) {
  pinDataStorage = JSON.parse(localStorage.getItem(PIN_NOTE_CHANGE));
}
const initialState = {
  loading: false,
  success: "",
  noteData: [],
  error: null,
  noteEdit: [],
  noteTypes: [],
  notePin: pinDataStorage,
};

export const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTE: {
      const noteType = action.payload.map((note) => note.note_type);
      return {
        ...state,
        noteData: action.payload,
        noteTypes: [...new Set(noteType)],
      };
    }
    //ADDING
    case ADD_NOTE_SUCCESS: {
      return {
        ...state,
        noteData: action.payload.note,
        success: "Add note success",
      };
    }
    case ADD_NOTE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: "Add note failure",
      };
    }
    //Get Edit Data
    case GET_NOTE_EDIT: {
      let editData = state.noteData.find(
        (note) => note.note_id === action.payload
      );
      return {
        ...state,
        noteEdit: editData || {}
      };
    }
    //UPDATE
    case UPDATE_NOTE_SUCCESS: {
      return {
        ...state,
        noteData: action.payload.note,
        success: "Update note success",
      };
    }
    case UPDATE_NOTE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: "Update note failure",
      };
    }
    //DELETE
    case DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        noteData: action.payload.note,
        success: "Delete note success",
      };
    }
    case DELETE_NOTE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        success: "Delete note failure",
      };
    }
    case RESET_NOTE_SUCCESS: {
      return {
        ...state,
        success: "",
      };
    }
    case PIN_NOTE_CHANGE: {
      const id  = action.payload; // Assuming action.payload contains note_id
      const noteToPin = state.noteData.find(note => note.note_id == id);
      let updatedPinData = [...state.notePin];

      if (noteToPin) {
        // Check if the note is already pinned
        const noteIndex = updatedPinData.findIndex(note => note.note_id === id);
        
        if (noteIndex !== -1) {
          // If the note is already pinned, remove it
          updatedPinData.splice(noteIndex, 1);
        } else {
          // If the note is not pinned, add it to pinData
          updatedPinData.push(noteToPin);
        }
        // Save updated pinData to local storage
        localStorage.setItem(PIN_NOTE_CHANGE, JSON.stringify(updatedPinData));
      }

      return {
        ...state,
        success: "",
        notePin: updatedPinData,
      };
    }

    default:
      return { ...state };
  }
};
