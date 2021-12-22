import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import gameFormReducer from './slices/gameForm'

const rootReducer = combineReducers({
  gameForm: gameFormReducer,
  // ADD REDUCERS HERE
})
export type RootState = ReturnType<typeof rootReducer>
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // .prepend(
  //   // correctly typed middlewares can just be used
  //   additionalMiddleware,
  //   // you can also type middlewares manually
  //   untypedMiddleware as Middleware<
  //     (action: Action<'specialAction'>) => number,
  //     RootState
  //   >
  // )
  // // prepend and concat calls can be chained
  // .concat(logger)
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
