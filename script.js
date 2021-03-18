'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = account1.movements;
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false){

  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov}EUR</div>
    </div>
  `;
  containerMovements.insertAdjacentHTML('afterbegin', html);
})
};


const calcDisplayBalance = function(accs){  
  accs.balance = accs.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${accs.balance} EUR`;
};

const calcDisplaySummary = function(acc){  

  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}EUR`;
  
  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}EUR`;
  
  const interest = acc.movements.filter(mov => mov > 0).map(depo => depo * acc.interestRate/100)
  .filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}EUR`
  
}

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}

createUsernames(accounts);

const updateUI = function(acc){
  //Display movements
  displayMovements(acc.movements);
    
  //Display Balance
  calcDisplayBalance(acc);
  
  //Display Summary
  calcDisplaySummary(acc);
}

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  
  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUI(currentAccount)
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && currentAccount.balance >= amount && receiverAcc
    && receiverAcc?.username !== currentAccount.username){
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount)
    }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin){
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      
      accounts.splice(index, 1);
      console.log(index);
      
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2,4));

// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// console.log(letters.join(' -> '));




/*
for (const [i, movement] of movements.entries()){
  if(movement > 0) console.log(`Movement ${i+1}: You deposited ${movement}`);
  else console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
}

console.log('----FOR EACH----');

movements.forEach(function(movement, index, array){
  movement > 0 ? console.log(`Mvm ${index+1}: You deposited ${movement}`) : 
  console.log(`Mvm ${index+1}: You withdrew ${Math.abs(movement)}`);
});

*/


/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, map){
  console.log(`${value}: ${value}`);
})
*/

//Codding challange #1

// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];

// const checkDogs = function(a, b){
//   const newArr = a.slice(1,-2).concat(b);
//   console.log(newArr);
//   for(const  [i, dogs] of newArr.entries()){
//     // console.log(i, dogs );
//     console.log(`Dog number ${i + 1} is ${newArr[i] < 3? 'still a puppy' : 'adult'} and is ${newArr[i]} years old`);
//   }
// }

// checkDogs(juliaData, kateData);




//filter

// const deposits = movements.filter(function(mov){
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for(const mov of movements){
//   if(mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);



//reduce
// console.log(movements);

// const balance = movements.reduce(function(acc, cur, i, arr){
//   console.log(`${i}: ${acc} //// ${arr}`);
//   return acc + cur;
// }, 100);
// console.log(balance);

// const balanceArrow = movements.reduce((acc, cur) => acc+cur, 0);
// console.log(balanceArrow);

// const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0]);
// const min = movements.reduce((acc, mov) => acc < mov ? acc : mov, movements[0]);
// console.log(max);
// console.log(min);



//Codding challange #2

// const dogAges = [5, 2, 4, 1, 15, 8, 3];

// const calcHumanAge = function(ages){
//   const humanAges = ages.map(age => age <=2 ? 2 * age : 16 + 4 * age);
//   return humanAges;
// }
// const a = calcHumanAge(dogAges);
// console.log(a);

// const adultDogs = a.filter(age => age >= 18 );
// console.log(adultDogs);

// const ave = adultDogs.reduce((acc, age, i, arr) => acc + age/ arr.length, 0);

// console.log(ave);



// const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * 1.1).
//                          reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);


//Codding challange #3

// const calcAverageHumanAge = function(ages){
//   const humanAges = ages.map(age => age <= 2 ? 2*age : 16 + 4*age)
//                     .filter(age => age > 18).reduce((acc, age, i, arr) => acc + age/arr.length, 0);
//   console.log(humanAges);
// }
// calcAverageHumanAge([16,6,10,5,6,1,4]);



//find method

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.pin === 1111);
// console.log(account);




//some
// console.log(movements);
// console.log(movements.includes(-130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);


// //every
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));



//flat
// const arr = [[1,2,3],[4,5,6],7,8];
// console.log(arr,arr.flat()); 
// const arrDeep = [[1,[2,3]],[4,[5,6]],7,8];
// console.log(arrDeep.flat(2));

// // const accountsMovements = accounts.map(acc => acc.movements);
// // console.log(accountsMovements);
// // const allMovements = accountsMovements.flat();
// // console.log(allMovements);
// // const overallBAlance = allMovements.reduce((acc, cur) => acc + cur, 0);
// // console.log(overallBAlance);

// const overallBAlance = accounts.map(acc => acc.movements).flat()
//                        .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBAlance);

// //flatMap

// const overallBAlance2 = accounts.flatMap(acc => acc.movements)
//                        .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBAlance2);


// const a = ['sd', 'asf', 'sfz', 'rbd', 'psy'];
// const c = [1, 5, 6, 7, 2, 23, 76, 34];

// console.log(c.sort((x,y) => x - y).concat(a.sort()));

// const b = a.sort();

// console.log(a, b);





// const x = new Array(7);
// console.log(x);

// console.log(x.fill(2,3,5));

// const y = Array.from({length: 10}, () => 1);
// console.log(y);

// const z = Array.from({length:10}, (cur, i)=> i+1);
// console.log(z);

// const diceRoll = Array.from({length:100}, (cur, i)=> Math.trunc(Math.random()*6) +1);
// console.log(diceRoll);



// labelBalance.addEventListener('click', function(){
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
//   el => Number(el.textContent.replace('EUR', ''))
//   );
//   console.log(movementsUI);
// });




// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov >0);

// console.log(bankDepositSum.reduce((acc, cur) => acc+cur));

// // const numDeposits = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;

// const numDeposits = accounts.flatMap(acc => acc.movements).reduce((count, curr) => (curr >= 1000 ? ++count: count),0);
// console.log(numDeposits);

// const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) =>{
//   cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;  
//   return sums
// },{deposits: 0, withdrawals : 0})

// console.log(sums);

// const {deposits, withdrawals} = accounts.flatMap(acc => acc.movements).reduce((sums, cur) =>{
//   // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;  
//   sums[cur > 0? 'deposits' : 'withdrawals'] += cur
//   return sums
// },{deposits: 0, withdrawals : 0})
// console.log(deposits, withdrawals);

// const convertTitleCase = function(title){
//   const capitalize = word => word[0].toUpperCase() + word.slice(1);

//   const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title.toLowerCase().split(' ').map(word =>
//     exceptions.includes(word) ? word : capitalize(word))
//     .join(' ');

//   return capitalize(titleCase);
// };
// console.log(convertTitleCase('or this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));




///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating
 too much or too little.
Eating too much means the dog's current food portion is larger than the recommended 
portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above 
and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the 
recommended food portion and add it to the object as a new property. Do NOT create a new 
array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners 
array, and so this one is a bit tricky (on purpose) 
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: 
"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's 
dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that 
is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true 
  or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to 
  reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in 
an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary 
lecture to choose between them 
HINT 2: Being within a range 10% above and below the recommended portion means:
 current > (recommended * 0.90) && current < (recommended * 1.10). Basically, 
 the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
GOOD LUCK 
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(dog => dog.recPor = Math.trunc(dog.weight ** 0.75 * 28));
//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
const recommendedFood = function(dog){
  
  if(dog.curFood < 0.9 * dog.recPor) return 'less';
  else if(dog.curFood > 1.1 * dog.recPor) return 'much';
  else return 'normal'

}
console.log(`Sarah's dog is eating ${recommendedFood(dogSarah)}`);

//3
const ownersEatTooMuch = dogs.filter(dog => dog.recPor > dog.curFood).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.recPor < dog.curFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);
//5
console.log(dogs.some(dog => dog.curFood === dog.recPor));
//6
const checkEating = dog => dog.curFood > 0.9 * dog.recPor && dog.curFood < 1.1 * dog.recPor;
console.log(checkEating);
//7
console.log(dogs.filter(checkEating));
//8
const dogsSorted = dogs.slice().sort((a,b) => a.curFood - b.curFood);
console.log(dogsSorted);



