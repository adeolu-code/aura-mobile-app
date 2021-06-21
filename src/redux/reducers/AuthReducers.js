import { TOGGLE_BIOMETRIC } from './../Types'

const initialState = {
    biometricEnabled: false,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case TOGGLE_BIOMETRIC:
        return { ...state, biometricEnabled: payload } 

    //   case typeName:
    //     return { ...state };

    default:
        return state
    }
};