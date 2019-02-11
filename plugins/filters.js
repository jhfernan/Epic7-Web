import Vue from 'vue'

// Date Filters
let options = [
	{ year: 'numeric', month: 'short', day: 'numeric' },
	{ hour: '2-digit', minute: '2-digit' }
]

Vue.filter('shortDate', val => new Date(val).toLocaleDateString())
Vue.filter('longDateTime', val => {
	return `${new Date(val).toLocaleDateString('en-US', options[0])} at ${new Date(val).toLocaleTimeString('en-US', options[1])}`
})

Vue.filter('timeSince', val => {
	if (!val[0] || !val[1]) return 'No times given to calculate difference'
	let response = (new Date(val[0]) - new Date(val[1])) / 1000
	if (response > 157680000) {
		return 'A long, long time ago'
	} else if (response > 63072000) {
		return `${Math.round(response / 31536000)} years ago`
	} else if (response > 31536000) {
		return 'One year ago'
	} else if (response > 5256000) {
		return `${Math.round(response / 2628000)} months ago`
	} else if (response > 2627700) {
		return 'One month ago'
	} else if (response > 172500) {
		return `${Math.round(response / 86400)} days ago`
	} else if (response > 86100) {
		return 'One day ago'
	} else if (response > 6900) {
		return `${Math.round(response / 3600)} hours ago`
	} else if (response > 3300) {
		return 'One hour ago'
	} else if (response > 115) {
		return `${Math.round(response / 60)} minutes ago`
	} else if (response > 55) {
		return 'A minute ago'
	} else if (response > 0) {
		return 'A few seconds ago'
	} else {
		return 'Future times don\'t count'
	}
})

Vue.filter('fullName', val => {
	if (!val) return ''
	let name = val.name
	if (val.name === val.last) {
		return val.name
	}
	val.mi
		? name += ` ${val.mi} ${val.last}`
		: name += ` ${val.last}`
	return name
})

Vue.filter('namePossesive', val => {
	if (!val) return ''
	if (val.substr(val.length - 1) === 's') {
		return '\''
	} else {
		return '\'s'
	}
})
