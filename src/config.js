export default class Config {
	constructor(config) {
		this.defaults = {
			batch: {
				numRuns: 1,
				numCycles: 3,
				numSteps: 4,
			},
			person: {
				numDimensions: 4,
				schedule: ['p','p','p','c'],
			},
			product: {
				numZeros: 2,
				effect: 'dimensional', // or random
			},
			team: {
				numTeams: 12,
				numMembers: 3,
				numProducts: 4,
			}
		}
	
		this.config = Object.freeze(Object.assign({}, this.defaults, config))
		this.errors = []
		this.warnings = []

		for(const param in config) {
			const method = `validate${param[0].toUpperCase() + param.slice(1)}`
			if (!this[method]) {
				this.unknownParam('',param)
			}
			else {
				this[method](config[param])
			}
		}

		if (this.warnings.length) {
			console.log(this.warnings.join('\n'))
		}

		if (this.errors.length) {
			throw this.errors.join('\n')
		}
	}

	validateBatch(batch) {
		this.typeCheck('batch',batch)
		Object.freeze(batch)
		if (batch.numRuns > 1000) {
			this.errors.push(`The configuration batch.numRuns must be <= 1000.`)
		}
	}

	validatePerson(person) {
		this.typeCheck('person',person)
		Object.freeze(person)
		if (person.numDimensions > 10) {
			this.errors.push(`The configuration person.numDimensions must be <= 10.`)
		}
	}

	validateProduct(product) {
		this.typeCheck('product',product)
		Object.freeze(product)
		if (product.numZeros > 9) {
			this.errors.push(`The configuration product.numZeros must be <= 10.`)
		}
	}

	validateTeam(team) {
		this.typeCheck('team',team)
		Object.freeze(team)
	}

	typeCheck(grpname,config) {
		const defaults = this.defaults[grpname]
		for(const param in defaults) {
			if (!(param in config)) {
				config[param] = defaults[param]
			}
		}
		for(const param in config) {
			if (!(param in defaults)) {
				this.unknownParam(grpname,param)
			}
			else {
				const valueType = typeof defaults[param]
				if (typeof config[param] !== valueType) {
					this.errors.push(`The configuration ${grpname}.${param} must be of type='${valueType}'.`)
				}
			}
		}
	}

	unknownParam(grpname='',param) {
		const grp = grpname ? grpname+'.' : ''
		this.warnings.push(`Warning: Unrecognized configuration parameter '${grp}${param}'.`)
	}
}