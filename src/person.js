export default class Person {
	constructor(config) {
		this.id = config.id
		const rfit = Math.random().toFixed(8)
		this.fitness = [
			Math.max(50,+rfit.slice(2,4)),
			Math.max(50,+rfit.slice(4,6)),
			Math.max(50,+rfit.slice(6,8)),
			Math.max(50,+rfit.slice(8)),
		]

		this.burden = 0
	}

	report() {
		for(const f of this.fitness) {
			this.burden += 100 - f
		}

		return this.burden
	}
}
