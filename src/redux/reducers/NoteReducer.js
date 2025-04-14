const initialState = {
    loading: false,
    success: false,
    noteData: [],
    error: null,
    notetEdit: {},
    noteTypes:[],
  };
  
  export const NoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_NOTE": {
        const noteType = action.payload.map(note => note.note_type);
        return {
          ...state,
          noteData: action.payload,
          noteTypes: [...new Set(noteType)],
          
        };
        
      }
      default:
        return { ...state };
    }
  };
  