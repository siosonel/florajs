import Products from './products'
import Person from './person'
import Team from './team'
import Catalog from './catalog'

export default function main(config) {
	const products = new Products({
		numProducts: config.numTeams * config.numProducts
	}) 
	const catalog = new Catalog(products.products)
	const teams = []
	const persons = []

	// create teams
	for(let i=0; i < config.numTeams; i++) {
		const team = new Team({
			id: i,
		})
		teams.push(team)
		
		for(let k=0; k < config.numProducts; k++) {
			products.assign(team)
		}

		for(let j=0; j < config.numMembers; j++) {
			const person = new Person({
				id: j,
				team,
				catalog
			})
			persons.push(person)
			team.addMember(person,config.numMembers)
		}
	}
	
	const totalSteps = config.numCycles * config.numSteps
	for(let n=0; n < totalSteps; n++) {
		shuffle(persons)
		for(const person of persons) {
			person.act()
		}
	}
	console.log('totalNoBestChoice = ' + catalog.totalNoBestChoice)
	console.log(report(teams))
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

function report(teams) {
	const reports = []
	for(const team of teams) {
		reports.push([team.id, team.report()])
	}
	return reports
}
