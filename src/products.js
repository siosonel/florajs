export default class Products {
	constructor(config) {
		this.products = []
		const values = [1,2,3,4,5,6,7,8,9,0]
		const productIds = []
		while(this.products.length < config.numProducts) {
			this.shuffle(values)
			// require zero on a few product dimensions
			const product = values.slice(0, 2).concat([0,0])
			this.shuffle(product)
			const id = product.join('')
			
			if (!productIds.includes(id)) {
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
