export default class Person {
	constructor(config) {
		this.config = config
		this.id = config.id
		this.team = config.team
		this.catalog = config.catalog
		this.setFitness()
		this.cyclesPerReport = 0.1*1/this.fitness.length
		this.burden = 0
		this.acctBalance = 0
		this.schedule = config.schedule
		this.scheduleIndex = Math.floor(Math.random()*this.schedule.length)
	}

	setFitness() {
		this.fitness = []
		while(this.fitness.length < this.config.numDimensions) {
			this.fitness.push(50 + Math.floor(50*Math.random()))
		}
	}

	act() {
		this.decay()
		const todo = this.schedule[this.scheduleIndex]
		this.scheduleIndex = this.scheduleIndex < this.schedule.length - 2 ? this.scheduleIndex + 1 : 0
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
		
		if (0 && maxDeficit > 99) { //console.log('died '+ this.id, this.fitness)
			this.setFitness()
			this.produce(totalDeficit)
			return
		}

		if (this.acctBal == 0) {
			this.produce(totalDeficit)
		}
		else if (this.acctBal == 0 || todo=='c' || maxDeficit > 40) {
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
