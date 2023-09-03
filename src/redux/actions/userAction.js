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
const setMonitoring = (userObj) => {
    console.log('userObj');
    console.log(userObj);
    console.log('userObj');
    return {    
        type: "SET_MONITORING",
        payload: userObj
    }
}
const setMapInformation = (userObj) => {
    console.log('Mapinformation');
    console.log(userObj);
    console.log('Mapinformation');
    return {    
        type: "SET_MAPINFORMATION",
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
    setAnnoucement,
    setMonitoring,
    setMapInformation
}