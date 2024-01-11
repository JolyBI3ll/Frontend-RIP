import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    current_id: -1,
}

const buttonSlice = createSlice({
    name: 'button',
    initialState: initialState,
    reducers: {
        updateButton: (state, action) => {
            state.current_id = action.payload.RequestId
            console.log(action.payload)
        }
    }
})

export const { updateButton } = buttonSlice.actions

export default buttonSlice.reducer