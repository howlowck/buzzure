import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom'
import App from './components/App'

const store = configureStore({
  reducer: {
    // ADD REDUCERS HERE
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
})

const app = document.getElementById('app')
ReactDOM.render(<App />, app)
