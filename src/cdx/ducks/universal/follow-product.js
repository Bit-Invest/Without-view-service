const actions = [];

const actionsForTied = actions.reduce((pr, curAction) => 
	Object.assign({}, pr, {
		[curAction.propertyFn]: curAction,
	})
, {});

export default ({
	'array': actions,
	'object': actionsForTied,
});
