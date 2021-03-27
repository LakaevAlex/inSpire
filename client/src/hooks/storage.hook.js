const useStorage = () => {
    const saveToStorage = (key, value) => {
        localStorage.setItem(key, value)
    }
    const getFromStorage = (key) => {
        localStorage.getItem(key)
    }
    const clearStorage = () => {
        localStorage.clear()
    }

    return {saveToStorage, getFromStorage, clearStorage}
}

export default useStorage