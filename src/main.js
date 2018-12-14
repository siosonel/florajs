import Config from './config'
import Products from './products'
import Person from './person'
import Team from './team'
import Catalog from './catalog'
import Reports from './reports'

export default function main(_config) {
	const config = (new Config(_config)).config
	const products = new Products(config)
	const catalog = new Catalog(products.products)
	const teams = []
	const persons = []
	const reports = new Reports({teams, catalog})

	// create teams
	for(let i=0; i < config.team.numTeams; i++) {
		const team = new Team({
			id: i,
		})
		teams.push(team)
		
		for(let k=0; k < config.team.numProducts; k++) {
			products.assign(team)
		}

		for(let j=0; j < config.team.numMembers; j++) {
			const person = new Person({
				id: j,
				team,
				catalog,
				numDimensions: config.person.numDimensions,
				schedule: config.person.schedule,
			})
			persons.push(person)
			team.addMember(person,config.team.numMembers)
		}
	}
	
	// run cycles
	const totalSteps = config.batch.numCycles * config.batch.numSteps
	for(let n=0; n < totalSteps; n++) {
		shuffle(persons)
		for(const person of persons) {
			person.act()
		}
	}

	// log output to console
	reports.summarize()
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

