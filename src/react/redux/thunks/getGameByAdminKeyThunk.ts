import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiGetGameResponse } from '../../../types'

export const getGameByAdminKeyThunk = createAsyncThunk<
  ApiGetGameResponse,
  string
>('getGameByAdminKey', async (adminKey) => {
  const response = await axios.get(`/api/games/admin-key/${adminKey}`)
  return response.data
})
