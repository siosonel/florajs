const main = require('../dist/flora.cjs')

main({
	batch: {
		numRuns: 1,
		numCycles: 30,
		numSteps: 4,
	},
	person: {
		numDimensions: 4,
	},
	product: {
		numZeros: 2,
	},
	team: {
		numTeams: 48,
		numMembers: 3,
		numProducts: 4,
	}
})

