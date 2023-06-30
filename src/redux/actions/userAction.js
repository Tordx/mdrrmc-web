const setUser = (userObj) => {
    return {    
        type: "SET_USER",
        payload: userObj
    }
}
const setAnnoucement = (userObj) => {
    return {    
        type: "SET_ANNOUCEMENT",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logOut,
    setAnnoucement
}