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

	act(member,totalDeficit) {
		// add product and (add budget or lower price)
		// or clean
		let lowProduct
		for(const product of this.products) {
			if (!lowProduct || lowProduct.qty > product) {
				lowProduct = product
			}
		}
		const qty = Math.floor((100 - totalDeficit)/50 + Math.random()*10)
		lowProduct.qty += qty
		const amount = qty*lowProduct.price
		this.budgets.revenue += amount
		this.budgets.expense += amount
		member.acctBalance += amount
	}

	report() { console.log(this.id, this.members.map(m=>m.fitness), this.products.map(p=>p.qty))
		let burden = 0
		for(const member of this.members) {
			burden += member.report()
		}
		return burden
	}
}
