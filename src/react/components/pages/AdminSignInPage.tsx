import { PrimaryButton, TextField } from '@fluentui/react'
import { FC } from 'react'
import { Link } from 'wouter'

type Props = {}

const Component: FC<Props> = ({}) => {
  return (
    <div>
      <h1>Admin Join Game</h1>
      <TextField label="Admin Password" type="password" />
    </div>
  )
}

export default Component
