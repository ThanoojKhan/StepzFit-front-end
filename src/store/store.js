import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { admin } from "./slice/admin";
import {user} from './slice/user'
import {trainer} from './slice/trainer'


const userPersistConfig = {key:"userAuth",storage,version:1}
const trainerPersistConfig = {key:"trainerAuth",storage,version:1}
const adminPersistConfig = {key:"adminAuth",storage,version:1}


const userPersistReducer = persistReducer(userPersistConfig,user.reducer)
const trainerPersistReducer = persistReducer(trainerPersistConfig,trainer.reducer)
const adminPersistReducer = persistReducer(adminPersistConfig,admin.reducer)

export const Store = configureStore({
    reducer: {
        User: userPersistReducer,
        Trainer: trainerPersistReducer,
        Admin: adminPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);