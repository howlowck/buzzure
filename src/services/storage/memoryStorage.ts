import { StorageClient } from '../../types'

const data: Record<string, { [key: string]: any }> = {
  test: {
    __game__: {
      gameName: 'Main Game',
      adminPassword: 'test',
      teams: [
        {
          teamId: 'aR7TeGvMo-CGLbjIjfefd',
          color: '#0bb873',
          name: 'Team 1',
        },
        {
          teamId: 'El7tjOh4YAWBJvvUOzAYs',
          color: '#1900ff',
          name: 'Team 2',
        },
        {
          teamId: 'EUGutTbx_jcdN5dh57boI',
          color: '#a80bbd',
          name: 'Team 3',
        },
      ],
    },
  },
}

const memoryStorage: StorageClient = {
  getItem: (partition, name, defaultValue) => {
    if (!data[partition]) {
      return defaultValue
    }
    return data[partition][name] ?? defaultValue
  },
  setItem: (partition, name, value) => {
    if (!data[partition]) {
      data[partition] = {}
    }
    data[partition][name] = value
    return Promise.resolve()
  },
  deleteItem: (partition, name) => {
    if (!data[partition]) {
      return Promise.resolve()
    }
    data[partition][name] = undefined
    return Promise.resolve()
  },
}

export default memoryStorage
