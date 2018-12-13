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
		const choices = this.shuffle(this.byMaxIndex[maxIndex]).slice(0,4).map(this.getChoice)
		let bestChoice
		let minExpectedBurden = this.maxDeficit
		for(const choice of choices) {
			const idealQty = Math.floor(maxValue / choice.product.maxValue)
			const product = choice.product
			if (!product.qty) {
				//console.log(product.team.id, product.id.join(''))
				continue
			}

			const id = product.id
			const qtys = id.map((val,i)=>Math.floor(deficits[i]/val))
			choice.qty = Math.min(...qtys, product.qty, Math.floor(balance/product.price))

			if (choice.qty > 0) {
				choice.price = choice.qty*product.price
				choice.expectedBurden = 0
				for(let i=0; i < id.length; i++) {
					choice.expectedBurden += deficits[i] - choice.qty*id[i];
				}
				
				if (choice.expectedBurden < minExpectedBurden) {
					bestChoice = choice
					minExpectedBurden = choice.expectedBurden
				}
				// console.log(choice.product.team.budgets.revenue, idealQty, choice.qty, choice.expectedBurden, choice.product.id)
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
