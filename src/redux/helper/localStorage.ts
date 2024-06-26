
export const laodStateLocalStorage = <T> (key: string): T | undefined => {
    try {
        const jsonState = localStorage.getItem(key)
        if (!jsonState){
            return undefined
        } 

        return JSON.parse(jsonState)

    } catch (e) {
        console.log(e)
        return undefined
    }
}

export const saveStateLocalStorage = <T>(key: string, state: T) => {

    const json = JSON.stringify(state)

    localStorage.setItem(key, json)
}

