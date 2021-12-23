import { FC, useState } from 'react'
import { css } from '@emotion/react'
import { PrimaryButton, TextField } from '@fluentui/react'
import TeamListForm from '../teams/TeamListForm'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import {
  updateGameName,
  addTeam,
  updateAdminPassword,
} from '../../redux/slices/gameForm'
import { useSelector } from 'react-redux'
import { TeamInfo } from '../../../types'

export default () => {
  const dispatch = useAppDispatch()
  const gameName = useAppSelector<string>((state) => state.gameForm.gameName)
  const setGameName = (val: string) => {
    dispatch(updateGameName(val))
  }
  const teams = useAppSelector<TeamInfo[]>((state) => state.gameForm.teams)
  const status = useAppSelector<string>(
    (state) => state.gameForm.persistedState.status
  )
  const adminPass = useAppSelector<string>(
    (state) => state.gameForm.adminPassword
  )
  return (
    <div>
      <h1>Create a Game</h1>
      <p>Status: {status}</p>
      <TextField
        label="Game Name"
        onChange={(evt) => {
          setGameName(evt.currentTarget.value)
        }}
        value={gameName}
      />
      <TextField
        label="Admin Password"
        type="password"
        onChange={(evt) =>
          dispatch(updateAdminPassword(evt.currentTarget.value))
        }
        value={adminPass}
      />
      <TeamListForm
        teams={teams}
        addTeam={(team: TeamInfo) => {
          dispatch(addTeam(team))
        }}
      />
      <br />
      <br />
      <PrimaryButton onClick={() => {}}>Create Game</PrimaryButton>
    </div>
  )
}
