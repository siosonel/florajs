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
			})
			persons.push(person)
			team.addMember(person,config.numMembers)
		}
	}
	// console.log(teams[0])
	// console.log(
	console.log(catalog.match([40,10,10,10], 10))
}

function report(teams) {
	const reports = []
	for(const team of teams) {
		reports.push([team.id, team.report()])
	}
	return reports
}
