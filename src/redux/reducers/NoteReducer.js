const initialState = {
  loading: false,
  success: false,
  noteData: [],
  error: null,
  noteEdit: [],
  noteTypes: [],
};

export const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTE": {
      const noteType = action.payload.map((note) => note.note_type);
      return {
        ...state,
        noteData: action.payload,
        noteTypes: [...new Set(noteType)],
      };
    }
    //ADDING
    case "ADD_NOTE_SUCCESS": {
      return {
        ...state,
        noteData: action.payload.note,
        success: true,
      };
    }
    case "ADD_NOTE_FAILURE": {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    //Get Edit Data
    case "GET_NOTE_EDIT": {
      let editData = state.noteData.find(
        (note) => note.note_id === action.payload
      );
      return {
        ...state,
        noteEdit: editData || {}
      };
    }
    //UPDATE
    case "UPDATE_NOTE_SUCCESS": {
      return {
        ...state,
        noteData: action.payload.note,
        success: true,
      };
    }
    case "UPDATE_NOTE_FAILURE": {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    //DELETE
    case "DELETE_NOTE_SUCCESS": {
      return {
        ...state,
        noteData: action.payload.note,
        success: true,
      };
    }
    case "DELETE_NOTE_FAILURE": {
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    }
    default:
      return { ...state };
  }
};
