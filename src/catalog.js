export default class Catalog {
	constructor(products) {
		this.products = products
		this.maxDeficit = products[0].id.length*100
		this.totalNoBestChoice = 0
		this.byMaxIndex = {}
		for(const product of products) {
			if (!this.byMaxIndex[product.maxIndex]) {
				this.byMaxIndex[product.maxIndex] = []
			}
			this.byMaxIndex[product.maxIndex].push(product)
		}
	}
	
	match(deficits, balance) {
		const maxValue = Math.max(...deficits)
		const maxIndex = deficits.indexOf(maxValue)
		const products = this.shuffle(this.byMaxIndex[maxIndex]).slice(0,4)
		let bestChoice
		let minExpectedBurden = this.maxDeficit
		for(const product of products) {
			// const idealQty = Math.floor(maxValue / product.maxValue)
			if (!product.qty) continue
			const id = product.id
			const qtys = id.map((val,i)=>Math.floor(deficits[i]/val))
			const qty = Math.min(...qtys, product.qty, Math.floor(balance/product.price))

			if (qty > 0) {
				const price = qty*product.price
				let expectedBurden = 0

				// calculate burden as though product.effect is dimensional
				// this calculation will be ignored if product.effect if random
				for(let i=0; i < id.length; i++) {
					expectedBurden += deficits[i] - qty*id[i];
				}
				
				if (expectedBurden < minExpectedBurden) {
					bestChoice = {product, qty, price, expectedBurden}
					minExpectedBurden = expectedBurden
					
					// if product consumption effect is random,
					// no need to optimize by comparing dimensional effect
					// of other product choices
					if (product.effect == 'random') {
						break
					}
				}
			} 
			//else console.log(balance, product.qty)
		}
		if (!bestChoice) {
			this.totalNoBestChoice++
		}
		return bestChoice
	}

	getChoice(product) {
		return {product}
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
