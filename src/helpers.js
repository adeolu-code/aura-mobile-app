import AsyncStorage from "@react-native-community/async-storage";

export const isEmpty = obj => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};


export const shortenXterLength = (string, number) => {
    if(string.length < number) {
        return string
    }
    return `${string.slice(0, number)}..`
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getUser = async () => {
    try {
        let user = await AsyncStorage.getItem("userData");
        return JSON.parse(user);
    } catch (error) {
        return error;
    }
}
export const getToken = async () => {
    try {
        let token = await AsyncStorage.getItem("token");
        return JSON.parse(token);
    } catch (error) {
        return error;
    }
}

export const setUser = async (userData) => {
    try {
        // const token = userData.token;
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        // await AsyncStorage.setItem("token", token);
    } catch (error) {
        console.log("Could not set user Data ", error.message);
    }
}
export const formatAmount = (amount) => {
    if (Number(amount) === 0 || amount) {
        return Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }
    
    return '***';
}

export const setToken = async (data) => {
    try {
        const token = data;
        await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        console.log("Could not set user Data ", error.message);
    }
}







