import { useDispatch, useSelector, useStore } from 'react-redux';
import { combineReducers, createStore } from 'redux'

import { newsReducer } from '@/modules/news-list';

const reducer = combineReducers({
    news: newsReducer
})

const store = createStore(reducer);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();