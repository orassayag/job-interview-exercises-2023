

































// =======================================================================================


// We are given an array containing n values that represent a stock price (let's say GOOG).
// We need to find the best prices to buy and sell a given stock with the biggest earning.
// Stock price can’t be negative but can be zero.
// n >= 1

// Input:
// [4,12,14,19,3,5,6,12,20,5,40]
// Output:
//  37
// (3,40)

// Input:
// [2,3,5,1,2]
// Output:
// 3
// (2,5)

// Input:
// [3,5,1,2,4]
// Output:
// 3
// (1,4)


/* const findBestPrice = (stockPrices) => {
  	let minPrice = 0;
    let maxProfit = 0;
    for(let i = 0; i < stockPrices.length; i += 1) {
       let price = stockPrices[i];
       minPrice = Math.min(minPrice, price);
       let profit = price - minPrice;
       if (price > maxProfit) {
         maxProfit = price;
       }
    }
    return maxProfit;
}; */


// const findBestPrice = (stockPrices) => {
//    let maxPrice = 0;
  
//   for(let i = 0; i < stockPrices.length - 1; i += 1) {
//   	 for(let j = i + 1; j < stockPrices.length; j += 1) {
//         let profit = stockPrices[j] - stockPrices[i];
//         if (profit > maxPrice) {
//           maxPrice = profit;
//         }
//      }
//   }
//   return maxPrice;
// };

















// Given a string containing only '(' and ')', return true if it is valid and false otherwise. 
// Valid examples: 
// , "()()(())", 
// invalid examples: 
// "())()", "(()", ")("

// (())


//"(()"

const isValid = (value) => {
	// const stack = [];
  let counter = 0;
  const index = { '(' : ')' };
  
  for(let i = 0; i < value.length; i += 1) {
  		const chari = value[i];
      const lastChari = value[i + 1];
      if (index[chari]) {
        counter += 1;
        // stack.push(chari);
      } else {
        // const lastChari = stack.pop();
        if (chari !== lastChari) {
          counter -= 1;
        }
      }
  }
  
  return counter === 0;
};

