export type StorageClientChoice = 'memory' | 'azTable'

export interface StorageClient {
  getItem: <T extends object>(
    gameId: string,
    rowId: string,
    defaultValue?: T
  ) => Promise<T>
  setItem: <T extends object>(
    gameId: string,
    rowId: string,
    value: T
  ) => Promise<void>
  deleteItem: (gameId: string, rowId: string) => Promise<void>
}

export type User = {
  name: string
  teamId: string
  teamColor: string
  userId: string
}

export type TeamInfo = {
  name: string
  color: string
}

export type Team = {
  teamId: string
  name: string
  color: string
}

export type PersistedGame = {
  gameId: string
  gameName: string
  teams: Team[]
  adminPassword: string
}

export type ApiCreateGameRequest = {
  gameName: string
  teams: TeamInfo[]
  adminPassword: string
}

export type ApiCreateGameResponse = {
  gameId: string
  adminKey: string
}

export type ApiGetGameResponse = Pick<
  PersistedGame,
  'gameId' | 'gameName' | 'teams'
>
