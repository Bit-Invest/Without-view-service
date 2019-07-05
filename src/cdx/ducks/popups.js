import commonUtils from '@cdx/utils/common'

const actions = []

const reducer = (state = {
	show: false,
}, action) => {
	const commonProcessed = commonUtils.reducer(state, action, 'popups')

	if (commonProcessed !== false)
		return commonProcessed

	return state
}

export default ({
	actions,
	reducer,
})