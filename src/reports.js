export default class Reports {
	constructor(config) {
		this.teams = config.teams
		this.catalog = config.catalog
	}

	byTeam() {
		const reports = []
		for(const team of this.teams) {
			reports.push([team.id, Math.round(team.report())])
		}
		return reports
	}

	summarize() {
		// report
		console.log('totalNoBestChoice = ' + this.catalog.totalNoBestChoice)
		console.log('Team Id | Member Min Fitness:acctBal | Rev:Exp Budgets | ProdId-Remaining-Produced')
		const reports = this.byTeam()
		reports.sort((a,b) => a[1] < b[1] ? -1 : 1)
		console.log('Team burden min', reports.slice(0,3))
		console.log('Team burden max', reports.slice(-3))
	}
}
