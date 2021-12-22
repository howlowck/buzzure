import { FC, useState } from 'react'
import { css } from '@emotion/react'
import { TextField } from '@fluentui/react'
import TeamListForm from '../teams/TeamListForm'

export default () => {
  const [gameName, setGameName] = useState('')

  return (
    <div>
      <h1>Create a Game</h1>
      <TextField
        label="Game Name"
        onChange={(evt) => {
          setGameName(evt.currentTarget.value)
        }}
        value={gameName}
      />
      <TeamListForm />
    </div>
  )
}
