import { JsonValue } from 'type-fest'
import { storageFactory } from 'storage-factory'

interface IjsonStorage<T extends JsonValue> {
  getItem: (key: string, defaultValue?: T) => T | undefined
  setItem: (key: string, value: T) => void
  removeItem: (key: string) => void
}

const factory = <T extends JsonValue>(_getStorage: () => Storage): IjsonStorage<T> => {
  const getStorage = (): Storage => {
    return storageFactory(_getStorage)
  }

  const getItem = (key: string, defaultValue?: T): T | undefined => {
    try {
      const storageValue = getStorage().getItem(key)
      return storageValue ? JSON.parse(storageValue) : undefined
    } catch {
      return defaultValue
    }
  }

  const setItem = (key: string, value: T): void => {
    try {
      getStorage().setItem(key, JSON.stringify(value))
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }

  const removeItem = (key: string): void => {
    getStorage().removeItem(key)
  }

  return { getItem, setItem, removeItem }
}

export default factory
