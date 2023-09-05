import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    name:null,
    role:null,
    token:null,
    trainerId:null
}

export const trainer = createSlice({
    name:'trainerAuth',
    initialState,
    reducers:{
        trainerLogin:(state,action)=>{
            state.name = action.payload.name,
            state.token = action.payload.token,
            state.role = action.payload.role
            state.trainerId = action.payload.trainerId
        },
        trainerLogout:(state,action)=>{
            state.name = null,
            state.token = null,
            state.role = null,
            state.trainerId = null
        }
    }
})

export const { trainerLogin,trainerLogout } = trainer.actions;
export default trainer.reducer;