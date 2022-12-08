/* eslint-disable no-unused-vars */
/// //////////////////////////////////////////////
/// //////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Juan Sánchez',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
}

const account2 = {
  owner: 'María Portazgo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
}

const account3 = {
  owner: 'Estefanía Pueyo',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
}

const account4 = {
  owner: 'Javier Rodríguez',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
}

const account5 = {
  owner: 'mohamed merzouk',
  movements: [430, 1000, 700, 50, 90, -100],
  interestRate: 1,
  pin: 1998
}
const accounts = [account1, account2, account3, account4, account5]

function createUsernames (users) {
  users.forEach((user) => {
    // eslint-disable-next-line no-param-reassign
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map((e) => e[0])
      .join('')
  })
}

createUsernames(accounts)

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

let currentAccount
btnLogin.addEventListener('click', (event) => {
  event.preventDefault()
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  )

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Bienvenido ${
        currentAccount.owner.split(' ')[0]
    }`
    containerApp.style.opacity = 100
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    calcDisplaySummary(currentAccount.movements)
    calcDisplayBalance(currentAccount.movements)
    displayMovements(currentAccount.movements)
  }
  console.log(currentAccount)
})

/* calcular y mostrar ingresos totales, retiradas totales e intereses */
function calcDisplaySummary (movements) {
  const ingresos = movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0)
  labelSumIn.textContent = ingresos
  // gastos
  const gastos = movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0)
  labelSumOut.textContent = `${gastos.toFixed(2)}€`
  // intereses
  // se calcularán los intereses de los movimientos positivos
  // se descartarán si el interés final es menor de 5
  const intereses = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * currentAccount.interestRate) / 100)
    .filter((mov) => mov >= 5)
    .reduce((acc, cur) => acc + cur, 0)
  labelSumInterest.textContent = `${intereses.toFixed(2)}€`
}
//json 
/* calcular y mostrar balance */
function calcDisplayBalance (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance}€`
}

function displayMovements (movements) {
  containerMovements.innerHTML = ''
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${mov}€</div>
        </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)

    // containerMovements.innerHTML = html
    // insertAdjacentHTML
  })
}
/* transferencia */
btnTransfer.addEventListener('click', (event) => {
  event.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  )
  inputTransferAmount.value = inputTransferTo.value = ''
  inputTransferAmount.blur()
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username// receiverAcc es definido y no es igual al usuario actual
  ) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    calcDisplaySummary(currentAccount.movements)
    calcDisplayBalance(currentAccount.movements)
    displayMovements(currentAccount.movements)
  }
})

/* Request loan */
btnLoan.addEventListener('click', (event) => {
  event.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount)
    calcDisplaySummary(currentAccount.movements)
    calcDisplayBalance(currentAccount.movements)
    displayMovements(currentAccount.movements)
  }
  inputLoanAmount.value = ''
}
)

btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    )
    console.log(index)
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})
