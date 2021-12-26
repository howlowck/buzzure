import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TeamInfo } from '../../../types'
import { createGameThunk } from '../thunks/createGameThunk'

interface GameFormState {
  persistedState:
    | { status: 'unsubmitted' }
    | { status: 'submitting' }
    | { status: 'submitted'; gameId: string }
    | { status: 'error'; message: string }
  gameName: string
  adminPassword: string
  teams: TeamInfo[]
  teamForm: {
    teamNameField: string
    teamColorField: string
  }
}

const initialState = {
  persistedState: { status: 'unsubmitted' },
  gameName: '',
  adminPassword: '',
  teams: [],
  teamForm: {
    teamNameField: '',
    teamColorField: '#ff0000',
  },
} as GameFormState

const gameFormSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTeam(state, action: PayloadAction<TeamInfo>) {
      state.teams = [...state.teams, action.payload]
    },
    updateGameName(state, action: PayloadAction<string>) {
      state.gameName = action.payload
    },
    updateTeamField(state, action: PayloadAction<string>) {
      state.teamForm.teamNameField = action.payload
    },
    updateTeamColor(state, action: PayloadAction<string>) {
      state.teamForm.teamColorField = action.payload
    },
    updateAdminPassword(state, action: PayloadAction<string>) {
      state.adminPassword = action.payload
    },
    resetTeamForm(state) {
      state.teamForm = {
        teamNameField: '',
        teamColorField: state.teamForm.teamColorField,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGameThunk.pending, (state) => {
        state.persistedState = { status: 'submitting' }
      })
      .addCase(createGameThunk.fulfilled, (state, action) => {
        state.persistedState = {
          status: 'submitted',
          gameId: action.payload.gameId,
        }
      })
      .addCase(createGameThunk.rejected, (state) => {
        state.persistedState = { status: 'error', message: '' }
      })
    // Add reducers for additional action types here, and handle loading state as needed
  },
})

export const {
  addTeam,
  updateAdminPassword,
  updateGameName,
  updateTeamColor,
  updateTeamField,
  resetTeamForm,
} = gameFormSlice.actions
export default gameFormSlice.reducer
