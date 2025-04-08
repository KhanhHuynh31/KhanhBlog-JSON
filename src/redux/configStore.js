import { configureStore } from '@reduxjs/toolkit'
import { PostReducer } from './reducers/PostReducer'
import { UserReducer } from './reducers/UserReducer'
import { WebReducer } from './reducers/WebReducer'

export const store = configureStore({
    reducer: {
        PostReducer,
        UserReducer,
        WebReducer
    },
})


