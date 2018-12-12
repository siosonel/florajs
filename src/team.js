export default class Team {
	constructor(config) {
		this.id = config.id
		this.products = []
		this.members = []
		this.budgets = {
			revenue: 0,
			expense: 0,
		}
	}

	addProduct(product) {
		this.products.push(product)
		this.budgets.revenue += product.qty
		this.budgets.expense += product.qty
	}

	addMember(person,numMembers) {
		this.members.push(person)
		person.team = this
		person.acctBalance = Math.floor(this.budgets.expense/numMembers)
	}

	act(member,deficits) {
		// add product and (add budget or lower price)
		// or clean
	}

	report() {
		const burden = 0
		for(const member of this.members) {
			burden += member.report()
		}
		return burden
	}
}
