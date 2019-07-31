let phrasesLng = {
	'auth-common': {
		'#1': '© 2019 Cindx',
	},
	'auth-sign-in': {
		'#1': 'Sign In', //title
		'#2': 'Email', //input placeholder
		'#3': 'Password', //input placeholder
		'#4': 'Sign In', //button send
		'#5': 'You do not have an account?',
		'#6': 'Sign Up', //link
		'#7': 'Fill in email',
		'#8': 'Fill in password',
		'#9': 'Incorrect login or password',
		'#10': 'Loading..',
	},
	'auth-sign-up': {
		'#1': 'Sign Up', //title
		'#2': 'Name', //input placeholder
		'#3': 'Last name', //input placeholder
		'#4': 'Email', //input placeholder
		'#5': 'Password', //input placeholder
		'#6': 'Sign Up', //button
		'#7': 'Do you have an account?',
		'#8': 'Sign In', //link
		'#9': 'Fill in Name',
		'#10': 'Fill in Last name',
		'#11': 'Fill in email',
		'#12': 'Fill in password',
		'#13': 'Request failed, try again.',
		'#14': 'Loading...',
		'#15': 'You are registered, you can log in.',
	},
	'header': {
		'#1': 'Profile',
		'#2': 'Marketplace',
		'#3': 'Log in',
		'#4': 'Sign up',
	},
	'small-product': {
		'#1': 'Rating',
		'#2': 'Rating processing..', //when processing rating
		'#3': 'week',
		'#4': 'month',
		'#5': 'all',
		'#6': 'Followers:',
		'#7': 'Enter product name if you are really going to delete it.', //alert
		'#8': 'more', //button
		'#9': 'manage', //button
		'#10': 'Change options',
		'#10_1': 'Remove',
		'#11': 'description', //input placeholder adit product
		'#12': 'name', //input placeholder adit product
		'#13': 'Save',
		'#14': 'Cancel',
		'#15': 'Select exchange account',
		'#16': 'You have no spare exchange accounts, please create a new account to create a product, and generate an API key for it.',
		'#17': 'description',
		'#18': 'name',
		'#19': 'Add',
		'#20': 'Cancel',
		'#21': 'Public',
		'#22': 'Private',
	},
	'full-product': {
		'#1': 'Rating',
		'#2': 'Rating processing..',
		'#3': 'Product name:',
		'#4': 'Number of investors:',
		'#5': 'Created on:',
		'#6': 'Product description:',
		'#7': 'Volatility:',
		'#8': 'IncomeAverage:',
		'#9': 'MaxDrawdown:',
		'#10': 'DmaxDD:',
		'#11': 'Income:',
	},
	'small-keys': {
		'#1': 'VALID',
		'#2': 'ERROR',
		'#3': 'WAITING',
		'#4': 'VALID (NO DATA)',
		'#5': 'NO TRADE HISTORY',
		'#6': 'INVALID KEY',
		'#7': 'Balances processing..',
		'#8': 'Following',
		'#9': 'Create',
		'#10': 'Rejected by',
		'#11': 'Waiting by',
		'#12': 'Enter account name if you are really going to delete it.',
		'#13_1': 'Edit',
		'#13': 'Remove',
		'#14': 'Name',
		'#15': 'Api key',
		'#16': 'Secret key',
		'#17': 'Save',
		'#18': 'Cancel',
		'#19': 'Name',
		'#20': 'Api key',
		'#21': 'Secret key',
		'#22': 'Add',
		'#23': 'Cancel',
		'#24': 'This is the current status of your API keys. Valid - the key is ready for work. Error - the key is invalid, click here for troubleshooting guide.',
		'#25': 'This is your account`s current balance displayed in the currently selected base asset.',
		'#26': 'This status indicates how your keys are currently used (Unused, to create a product or to follow a product)',
	},
	'small-dashboard': {
		'#1': 'We welcome you.',
		'#2': 'Please add your account from the exchange.',
		'#3': 'Thank you for adding your account.',
		'#4': 'Now you can create a product or connect to one of the managers.',
		'#5': 'Error', //emoji
		'#6': 'All accounts',
		'#7': '(marketplace)',
		'#8': '(personally)',
		'#9': 'Display Mode:',
		'#9_1': 'Select account:',
		'#10': 'Absolute Values',
		'#11': 'PROFIT',
		'#12': 'BALANCE',
		'#13': 'Displayed period:',
		'#14': 'Three days',
		'#15': 'Week',
		'#16': 'Month',
		'#17': 'Year',
		'#18': 'ALL',
		'#19': 'Select base asset:',
		'#20': 'Account profit in',
		'#21': 'Account profit in',
		'#22': 'Account history balances in',
		'#23': 'Account history balances in',
		'#24': 'Accounts Overview',
		'#25': 'Select all accounts if you wish to display the charts for all of them simultaneously or select an individual account to study separately.',
		'#26': 'Choose whether you want to see the change over time in %, or the absolute value in base currency.',
		'#27': 'Choose to view only the profit/loss over the reporting periods or the account`s total balance in absolute values.',
		'#28': 'Choose the reporting period to display.',
		'#29': 'By selecting the base asset, you choose whether to display the balance and/or profits in the base crypto currency of the product or USD.',
	},
};

const proxyToEmptyFn = {
	get(target, prop) {
		const ts = target[prop];

		if (typeof ts === 'object') {
			return new Proxy(ts, proxyToEmptyFn);
		}

		return `${ts} +`;
	}
};

let phrasesLngProxy = new Proxy(phrasesLng, proxyToEmptyFn);

export default phrasesLngProxy;