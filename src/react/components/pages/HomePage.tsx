import { PrimaryButton } from '@fluentui/react'
import { Link } from 'wouter'

export default () => {
  return (
    <div>
      <h1>HomePage</h1>
      <PrimaryButton>Join a Game</PrimaryButton>
      <Link href="/games/create">
        <PrimaryButton>Create a Game</PrimaryButton>
      </Link>
    </div>
  )
}
