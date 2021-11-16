import { useState } from 'react'

export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)  //localStorageの値取得

  const setValueWithStorage = (nextValue: string): void => {  // 取得した値をStateにset、localStorageにも保存
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValueWithStorage]
}