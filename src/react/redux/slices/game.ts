import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  status: 'unfetched' | 'fetching' | 'fetched' | 'error'
  id?: string
  name?: string
}

const initialState = {
  status: 'unfetched',
} as GameState

const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setGame(state, action: PayloadAction<{ id: string; name: string }>) {
      return {
        status: 'fetched',
        ...action.payload,
      }
    },
  },
})

export const { setGame } = gameSlice.actions
export default gameSlice.reducer
