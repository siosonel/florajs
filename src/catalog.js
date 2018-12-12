export default class Catalog {
	constructor(products) {
		this.products = products
	}
	
	match(deficits, balance) { console.log(deficits)
		const maxValue = Math.max(...deficits)
		const maxIndex = deficits.indexOf(maxValue)
		const choices = []
		
		for(const product of this.products) {
			if (maxIndex == product.maxIndex) {
				choices.push({product})
			}
			if (choices.length >= 5) break;
		}

		let bestChoice
		let minExpectedBurden = 1000
		for(const choice of choices) {
			const idealQty = Math.floor(maxValue / choice.product.maxValue)
			const id = choice.product.id
			const qtys = id.map((val,i)=>Math.floor(deficits[i]/val))
			choice.qty = Math.min(...qtys)
			choice.price = choice.qty*choice.product.price

			if (choice.product.qty >= choice.qty && balance >= choice.price) {
				choice.expectedBurden = 0
				for(let i=0; i < id.length; i++) {
					choice.expectedBurden += deficits[i] - choice.qty*id[i];
				}
				
				if (choice.expectedBurden < minExpectedBurden) {
					bestChoice = choice
					minExpectedBurden = choice.expectedBurden
				}
				console.log(choice.product.team.budgets.revenue, idealQty, choice.qty, choice.expectedBurden, choice.product.id)
			} 
		}
		return bestChoice
	}
}