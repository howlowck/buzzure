import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiGetGameResponse } from '../../../types'

export const getGameThunk = createAsyncThunk<ApiGetGameResponse, string>(
  'getGame',
  async (gameId) => {
    const response = await axios.get(`/api/games/${gameId}`)
    return response.data
  }
)
