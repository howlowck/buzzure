import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiCreateGameRequest, ApiCreateGameResponse } from '../../../types'

export const createGameThunk = createAsyncThunk<
  ApiCreateGameResponse,
  ApiCreateGameRequest
>('createGame', async (gameInfo) => {
  const response = await axios.post('/api/games', gameInfo)
  return response.data
})
