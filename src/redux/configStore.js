import { configureStore } from '@reduxjs/toolkit'
import { PostReducer } from './reducers/PostReducer'
import { UserReducer } from './reducers/UserReducer'
import { WebReducer } from './reducers/WebReducer'
import { NoteReducer } from './reducers/NoteReducer'

export const store = configureStore({
    reducer: {
        PostReducer,
        UserReducer,
        NoteReducer,
        WebReducer
    },
})


