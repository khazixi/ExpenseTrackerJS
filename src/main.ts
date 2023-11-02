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
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="change"> Edit </button>
  </div>
`

const editable_expense = (name: string, amount: number, desc: string) => `
  <form>
    <label for="name"> ${name} </label>
    <input type="text" name="name"/>
    <label for="amount"> ${amount} </label>
    <input type="number" name="amount"/>
    <label for="description"> Description: </label>
    <textarea name="description">
      ${desc}
    </textarea>
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="save"> Save </button>
  </form>
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


function remove_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const exp = elem.closest('div')
  exp!.remove()
}

function expense_adder() {
  const expense_list = document.getElementById('expenses')
  expense_list!.insertAdjacentHTML('beforeend', expense('expense', 0, 'New Expense'))
  const exp = expense_list!.lastElementChild!
  const removalButton = exp.querySelector('[data-edit="delete"]')
  removalButton!.addEventListener('click', (e) => remove_expense(e))
  const editButton = exp.querySelector('[data-edit="change"]')
  editButton!.addEventListener('click', (e) => console.log(`edit ${e.target}`))
}

document.getElementById('expense-adder')!.addEventListener('click', expense_adder)
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
