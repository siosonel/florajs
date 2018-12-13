export default class Person {
	constructor(config) {
		this.id = config.id
		this.team = config.team
		this.catalog = config.catalog
		const rfit = Math.random().toFixed(8)
		this.fitness = [
			Math.max(50,+rfit.slice(2,4)),
			Math.max(50,+rfit.slice(4,6)),
			Math.max(50,+rfit.slice(6,8)),
			Math.max(50,+rfit.slice(8)),
		]
		this.cyclesPerReport = 0.1*1/this.fitness.length
		this.burden = 0
		this.acctBalance = 0
		this.cycle = ['p','p','p','c']
		this.cycleIndex = Math.floor(Math.random()*this.cycle.length)
	}

	act() {
		this.decay()
		const todo = this.cycle[this.cycleIndex]
		this.cycleIndex = this.cycleIndex < this.cycle.length - 2 ? this.cycleIndex + 1 : 0
		const deficits = []
		let totalDeficit = 0
		let maxDeficit = 0
		for(const f of this.fitness) {
			const deficit = 100 - f
			totalDeficit += deficit
			deficits.push(deficit)
			if (deficit > maxDeficit) {
				maxDeficit = deficit
			}
		}
		if (todo=='c' || maxDeficit > 40) {
			this.consume(deficits)
		}
		else {
			this.produce(totalDeficit)
		}

		this.report()
	}

	decay() {	
		for(let i=0; i < this.fitness.length; i++) {
			this.fitness[i] += -(1 + Math.floor(5*Math.random()))
			if (this.fitness[i] < 0) {
				this.fitness[i] = 0
			}
		}
	}

	produce(totalDeficit) {
		this.team.act(this,totalDeficit)
	}

	consume(deficits) {
		const choice = this.catalog.match(deficits,this.acctBalance)
		if (!choice) return
		//console.log('bestChoice', choice)
		// pay selling team
		this.acctBalance += -choice.price
		this.team.budgets.expense += -choice.price
		choice.product.team.budgets.revenue += -choice.price
		
		// transfer product qty to buyer
		choice.product.qty += -choice.qty

		// buyer consumes product
		for(let i=0; i < this.fitness.length; i++) {
			this.fitness[i] += choice.qty*choice.product.id[i]
			if (this.fitness[i] < 0) {
				this.fitness[i] = 0
			}
		}
	}

	report() {
		let burden = 0
		for(const f of this.fitness) {
			burden += 100 - f
		}
		this.burden += this.cyclesPerReport * burden
		return this.burden
	}
}
