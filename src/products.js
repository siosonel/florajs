export default class Products {
	constructor(config) {
		this.numProducts = config.team.numTeams*config.team.numProducts
		this.products = []
		const values = [1,2,3,4,5,6,7,8,9,0]
		const productIds = []
		const numDimensions = config.person.numDimensions
		const zeros = Array(config.product.numZeros).fill(0)
		const nonZeros = numDimensions - zeros.length
		const minUniqueProds = this.getMinUniqueProds(numDimensions,zeros)

		while(this.products.length < this.numProducts) {
			this.shuffle(values)
			// require zero on a few product dimensions
			const product = values.slice(0, nonZeros).concat(zeros)
			this.shuffle(product)
			const id = product.join('')
			
			if (id != '0000' && (!productIds.includes(id) || productIds.length > minUniqueProds)) {
				productIds.push(id)
				const maxValue = Math.max(...product)
				const qty = 20 + Math.floor(15*Math.random())
				this.products.push({
					id: product,
					qty,
					price: 1,
					maxValue,
					maxIndex: product.indexOf(maxValue),
					qtyProduced: qty
				})
			}
		} 
		// console.log(this.products.map(d=>d.id))
		this.currProductIndex = 0
	}

	getMinUniqueProds(numDimensions,zeros) {
		const values = [9,8,7,6,5,4,3,2,1];
		const upperVals = values.slice(0,numDimensions-zeros.length);
		const valFactorial = upperVals.reduce((prod,val)=>prod*val,1)
		const numUniqueGaps = !zeros.length ? 1 
							: values.slice(-numDimensions)
								.slice(0,-zeros.length)
								.reduce((prod,val)=>prod*val,1)/(numDimensions - zeros.length)
		const maxUniqueProds = valFactorial*numUniqueGaps - 1
		// console.log(numDimensions, zeros.length, valFactorial, numUniqueGaps, maxUniqueProds)
		return 0.9 * maxUniqueProds
	}

	assign(team) {
		const product = this.products[this.currProductIndex]
		product.team = team
		team.addProduct(product)
		this.currProductIndex++
	}

	shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	}
} 
