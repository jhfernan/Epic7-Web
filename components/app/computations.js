export default {
	// Percentile Rankings
	percentileRanking: (array, score) => {
		array.sort((a, b) => a - b)
		let position = array.lastIndexOf(score) + 1
		let totalCount = array.length
		return (position / totalCount) * 100
	},

	scoreFrequency: (array, score) => {
		return array.filter(v => v == score).length
	}

}
