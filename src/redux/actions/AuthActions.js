
import { TOGGLE_BIOMETRIC } from '../Types'
import { setBiometric } from '../../helpers'

export const toggleBiometricsValue = (value) => {
	return (dispatch) => {
		setBiometric(value)
		dispatch({ type: TOGGLE_BIOMETRIC, payload: value })
	}
}