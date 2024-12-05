import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage for web
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import courseReducer from './courseSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
