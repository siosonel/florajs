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
		// make more of the product that has the lowest quantity
		let lowProduct
		for(const product of this.products) {
			if (!lowProduct || product.qty < lowProduct.qty) {
				lowProduct = product
			}
		}
		const qty = Math.floor((100 - totalDeficit)/20 + Math.random()*5)
		lowProduct.qty += qty
		lowProduct.qtyProduced += qty 
		const amount = qty*lowProduct.price
		this.budgets.revenue += amount
		this.budgets.expense += amount
		const wage = Math.floor(amount/this.members.length)
		for(const m of this.members) {
			m.acctBalance += wage
		}
		// add remainder wage to this member
		member.acctBalance += amount - this.members.length*wage
	}

	report() { 
		console.log(
			this.id, 
			this.members.map(m=>[Math.min(...m.fitness), m.acctBalance].join(':')),
			this.budgets.revenue+':'+this.budgets.expense,
			this.products.map(p=>[p.id.join(''), p.qty, p.qtyProduced].join('-'))
		)
		let burden = 0
		for(const member of this.members) {
			burden += member.report()
		}
		return burden
	}
}
