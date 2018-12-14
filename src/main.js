import Products from './products'
import Person from './person'
import Team from './team'
import Catalog from './catalog'
import Reports from './reports'

export default function main(config) {
	if (config.numDimensions>10) {
		console.log(`The configuration parameter numDimensions must be < 11.`)
		return
	}
	if (config.numZeros>9) {
		console.log(`The configuration parameter numZeros must be < 10.`)
		return
	}

	const products = new Products({
		numProducts: config.numTeams * config.numProducts,
		numDimensions: config.numDimensions,
		numZeros: config.numZeros,
	})
	const catalog = new Catalog(products.products)
	const teams = []
	const persons = []
	const reports = new Reports({teams, catalog})

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
				catalog,
				numDimensions: config.numDimensions,
			})
			persons.push(person)
			team.addMember(person,config.numMembers)
		}
	}
	
	// run cycles
	const totalSteps = config.numCycles * config.numSteps
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

