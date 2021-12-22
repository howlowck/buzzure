export interface StorageClient {
  getItem: <T>(property: string, defaultValue?: T) => Promise<T>
  setItem: <T>(property: string, value: T) => Promise<void>
}

export type User = {
  name: string
  teamId: string
  teamColor: string
  userId: string
}

export type ReduxState = {
  user: User
  game: {
    name: string
    gameId: string
  }
  players: User[]
  buzzer: {
    buzzed: boolean
  }
  buzzed: string[] // UserIds
}