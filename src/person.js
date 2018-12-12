export default class Person {
	constructor(config) {
		this.id = config.id
		this.team = config.team
		const rfit = Math.random().toFixed(8)
		this.fitness = [
			Math.max(50,+rfit.slice(2,4)),
			Math.max(50,+rfit.slice(4,6)),
			Math.max(50,+rfit.slice(6,8)),
			Math.max(50,+rfit.slice(8)),
		]
		this.burden = 0
		this.acctBalance = 0
	}

	act() {
		const deficits = []
		let maxDeficit = 0
		for(const f of this.fitness) {
			const deficit = 100 - f
			deficits.push(deficit)
			if (deficit > maxDeficit) {
				maxDeficit = deficit
			}
		}
		if (maxDeficit < 40) {
			this.produce(deficits)
		}
		else {
			this.consume(deficits)
		}

		this.report()
		return burden
	}

	produce(deficits) {
		this.team.act(this,deficits)
	}

	consume(deficits) {
		const choice = this.catalog.match(deficits,this.acctBalance)
		if (!choice) return
		console.log('bestChoice', choice)
		// pay selling team
		// transfer product qty to buyer
		// buyer consumes product
	}

	report() {
		const burden = 0
		for(const f of this.fitness) {
			burden += 100 - f
		}
		this.burden += 0.01*burden
		return this.burden
	}
}
