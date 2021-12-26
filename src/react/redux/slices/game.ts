import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Team } from '../../../types'
import { createGameThunk } from '../thunks/createGameThunk'
import { getGameThunk } from '../thunks/getGameThunk'

interface GameState {
  status: 'unfetched' | 'fetching' | 'fetched' | 'error'
  id?: string
  name?: string
  teams: Team[]
}

const initialState = {
  status: 'unfetched',
} as GameState

const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGameThunk.pending, (state) => {
        state.status = 'fetching'
      })
      .addCase(getGameThunk.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(getGameThunk.fulfilled, (state, action) => {
        state.status = 'fetched'
        state.id = action.payload.gameId
        state.name = action.payload.gameName
        state.teams = action.payload.teams
      })
  },
})

export const {} = gameSlice.actions
export default gameSlice.reducer
