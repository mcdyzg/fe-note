
// ================================
// Action Type
// ================================
const CHANGESTATE = 'changeState'




// ================================
// Action Creator
// ================================
export const changeState = (data) => {
	return {
		type: CHANGESTATE,
		data,
	}
}


export const ACTION_HANDLERS = {
	[CHANGESTATE]: (state , action) => {
		let { data } = action
		return data
	},
}
