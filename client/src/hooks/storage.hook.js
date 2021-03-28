const useStorage = () => {
    const saveToStorage = (key, value) => {
        localStorage.setItem(key, value)
    }
    const loadFromStorage = (key) => {
        localStorage.getItem(key)
    }
    const clearStorage = () => {
        localStorage.clear()
    }

    return {saveToStorage, loadFromStorage, clearStorage}
}

export default useStorage