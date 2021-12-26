import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Team } from '../../../types'
import { createGameThunk } from '../thunks/createGameThunk'
import { getGameThunk } from '../thunks/getGameThunk'

interface AuthState {
  name?: string
  role?: 'admin' | 'player'
  clientKey?: string
  teamId?: string
}

const initialState = {} as AuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setClientKey(state, action: PayloadAction<string>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(createGameThunk.fulfilled, (state, action) => {
      state.role = 'admin'
      state.clientKey = action.payload.adminKey
    })
  },
})

export const {} = authSlice.actions
export default authSlice.reducer
