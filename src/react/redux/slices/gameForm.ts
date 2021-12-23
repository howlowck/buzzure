import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamInfo } from '../../../types'

interface GameFormState {
  persistedState:
    | { status: 'unsubmitted' }
    | { status: 'submitting' }
    | { status: 'submitted' }
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
