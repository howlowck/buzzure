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

export type ApiCreateGameRequest = {
  gameName: string
  teams: TeamInfo[]
}

export type ApiCreateGameResponse = {
  gameId: string
}

export type ApiGetGameResponse = {
  gameId: string
  gameName: string
  teams: Team[]
}
