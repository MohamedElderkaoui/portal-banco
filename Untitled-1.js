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
  pin: 2222,
}

const account3 = {
  owner: 'Estefanía Pueyo',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Javier Rodríguez',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const account5 = {
  owner: 'mohamed merzouk',
  movements: [430, 1000, 700, 50, 90, -100],
  interestRate: 1,
  pin: 1998,
}
const accounts = [account1, account2, account3, account4, account5]
// function escribir accounts en el fichero  banco.json y guardar en C:\2DAW\Desarrollo web en entorno cliente DAW Diurno\portal-banco\banco.json
function escribir(accounts) {
  const fs = require('fs')
  fs.writeFileSync('C:\\2DAW\\Desarrollo web en entorno cliente DAW Diurno\\portal-banco\\banco.json', JSON.stringify(accounts))
}

escribir(accounts)

// leer el fichero banco.json y mostrarlo en la consola
function leer() {
  const fs = require('fs')
  const data = fs.readFileSync('C:\\2DAW\\Desarrollo web en entorno cliente DAW Diurno\\portal-banco\\banco.json', 'utf8')
  console.log(data)
}

leer()