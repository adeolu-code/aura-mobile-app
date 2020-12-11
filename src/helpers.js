import AsyncStorage from "@react-native-community/async-storage";

require('number-to-locale-string-polyfill');

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

export const amenityIcons = [
    { name: 'dryer', iconName: 'waves', type: 'MaterialIcons'},
    { name: 'breakfast', iconName: 'free-breakfast', type: 'MaterialIcons'},
    { name: 'laptop friendly workspace', iconName: 'laptop-mac', type: 'MaterialIcons'},
    { name: 'lift', iconName: 'elevator', type: 'MaterialIcons'},
    { name: 'tv', iconName: 'tv-outline', type: 'Ionicons'},
    { name: 'hot water', iconName: 'hot-tub', type: 'MaterialIcons'},
    { name: 'air conditioning', iconName: 'toys', type: 'MaterialIcons'},
    { name: 'washing machine', iconName: 'wash', type: 'MaterialIcons'},
    { name: 'towels', iconName: 'check-circle', type: 'MaterialIcons'},
    { name: 'bedsheets', iconName: 'bed', type: 'Ionicons'},
    { name: 'soap', iconName: 'soap', type: 'MaterialIcons'},
    { name: 'toilet paper', iconName: 'toilet-paper', type: 'FontAwesome5'},
    { name: 'pillows', iconName: 'check-circle', type: 'MaterialIcons'},
    { name: 'wifi', iconName: 'wifi', type: 'Feather'},
    { name: 'default', iconName: 'check-circle', type: 'MaterialIcons'}
]
export const rulesIcons = [
    { name: 'suitable for children', iconName: 'child-friendly', type: 'MaterialIcons'},
    { name: 'suitable for infants', iconName: 'child-friendly', type: 'MaterialIcons'},
    { name: 'suitable for pets', iconName: 'pets', type: 'MaterialIcons'},
    { name: 'events or parties allowed', iconName: 'local-bar', type: 'MaterialIcons'},
    { name: 'no smoking allowed', iconName: 'smoke-free', type: 'MaterialIcons'},
    { name: 'default', iconName: 'check-circle', type: 'MaterialIcons'}
]
export const operationsIcons = [
    { name: 'Waiter', iconName: 'restaurant', type: 'MaterialIcons'},
    { name: 'Pickup', iconName: 'shopping-basket', type: 'MaterialIcons'},
    { name: 'Delivery', iconName: 'local-shipping', type: 'MaterialIcons'},
    { name: 'default', iconName: 'room-service', type: 'MaterialIcons'}
]
export const servicesIcons = [
    { name: 'Night Life', iconName: 'sports-bar', type: 'MaterialIcons'},
    { name: 'Breakfast', iconName: 'fastfood', type: 'MaterialIcons'},
    { name: 'Lunch', iconName: 'restaurant', type: 'MaterialIcons'},
    { name: 'Dinner', iconName: 'local-bar', type: 'MaterialIcons'},
    { name: 'Cafe', iconName: 'local-pizza', type: 'MaterialIcons'},
    { name: 'default', iconName: 'room-service', type: 'MaterialIcons'}
]
export const clearData = async () => {
    try {
        const keys = ['userData', 'token'];
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        return error;
    }
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
        console.log('Toke obj from set token ', data)
        await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        console.log("Could not set user Data ", error.message);
    }
}







