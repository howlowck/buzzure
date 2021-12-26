import { PrimaryButton } from '@fluentui/react'
import { FC, useEffect } from 'react'
import { Link } from 'wouter'
import { useAppDispatch } from '../../redux/store'
import { getGameThunk } from '../../redux/thunks/getGameThunk'

type Props = {
  gameId: string
}

const Component: FC<Props> = ({ gameId }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getGameThunk(gameId))
  }, [])
  return (
    <div>
      <h1>Join Game</h1>
    </div>
  )
}

export default Component
