import Person from './person'
import Team from './team'

export default function main(config) {
	const teams = []
	const persons = []
	
	// create teams and members
	for(let i=0; i < config.numTeams; i++) {
		const team = new Team({
			id: i,
			numResources: config.numResources
		})
		teams.push(team)

		for(let j=0; j < config.numMembers; j++) {
			const person = new Person({id: j})
			persons.push(person)
			team.addMember(person)
		}
	}

	console.log(report(teams))
}

function report(teams) {
	const reports = []
	for(const team of teams) {
		let burden = 0
		for(const member of team.members) {
			burden += member.report()
		}

		reports.push([team.id, burden])
	}

	return reports
}

// test
main({
	numTeams: 10,
	numMembers: 3,
	numResources: 3,
})
