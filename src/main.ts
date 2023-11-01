import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <button id="expense-adder"> + </button>
    <div id="expenses"></div>
  </div>
`


const expense = (name: string, amount: number, desc: string) => `
  <div>
    <h2> ${name} </h2>
    <h3> ${amount} </h3>
    <p> Description: <span> ${desc} </span> </p>
    <button> Remove Expense </button>
  </div>
`
//
// function remove_button() {
//   const expense = document.getElementById('#expenses')
//   const div = expense!.closest('div')
//   div!.remove()
// }

// function addButtonListeners() {
//   const buttons = document.querySelectorAll('#expenses > div > button')
//   for (let button of buttons) {
//     button.addEventListener('click', remove_button)
//   }
// }



function expense_adder() {
  const expense_list = document.getElementById('expenses')
  expense_list!.insertAdjacentHTML('beforeend', expense('expense', 0, 'New Expense'))
}

document.getElementById('expense-adder')!.addEventListener('click', expense_adder)
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
