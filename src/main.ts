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


const expense = (name: string, amount: string, desc: string) => `
  <div>
    <h2> ${name} </h2>
    <h3> ${amount} </h3>
    <p> Description: <span> ${desc} </span> </p>
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="change"> Edit </button>
  </div>
`

const editable_expense = (name: string, amount: string, desc: string) => `
  <form onsubmit="return false">
    <label for="name"> ${name} </label>
    <input type="text" name="name"/>
    <br>
    <label for="amount"> ${amount} </label>
    <input type="number" name="amount"/>
    <br>
    <label for="description"> Description: </label>
    <textarea name="description">
      ${desc}
    </textarea>
    <br>
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="save"> Save </button>
  </form>
`

function remove_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const exp = elem.closest('div')
  exp!.remove()
}

function save_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const form = elem.closest('form')
  const name = (form!.querySelector('[name="name"]')! as HTMLInputElement).value
  const amount = (form!.querySelector('[name="amount"]')! as HTMLInputElement).value
  const desc = (form!.querySelector('[name="description"]')! as HTMLInputElement).value
  form!.insertAdjacentHTML('beforebegin', expense(name, amount, desc))
  form?.querySelector('[data-edit="delete"]')?.removeEventListener('click', remove_expense)
  form?.querySelector('[data-edit="save"]')?.removeEventListener('click', save_expense)
  const exp = form?.previousElementSibling
  exp!.querySelector('[data-edit="delete"]')?.addEventListener('click', (e) => remove_expense(e))
  exp!.querySelector('[data-edit="edit"]')?.addEventListener('click', (e) => edit_expense(e))
  form!.remove()
}

function edit_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const exp = elem.closest('div')
  const name = exp?.querySelector('h3')?.textContent
  const amount = exp?.querySelector('h2')?.textContent
  const desc = exp?.querySelector('p > span')?.textContent
  exp?.querySelector('[data-edit="delete"]')?.removeEventListener('click', remove_expense)
  exp?.querySelector('[data-edit="edit"]')?.removeEventListener('click', edit_expense)
  exp?.insertAdjacentHTML('beforebegin', editable_expense(name!, amount!, desc!))
  const form = exp?.previousElementSibling!
  form.querySelector('[data-edit="delete"]')?.addEventListener('click', (e) => remove_expense(e))
  form.querySelector('[data-edit="save"]')?.addEventListener('click', (e) => save_expense(e))
  exp!.remove()
}

function expense_adder() {
  const expense_list = document.getElementById('expenses')
  expense_list!.insertAdjacentHTML('beforeend', expense('expense', "0", 'New Expense'))
  const exp = expense_list!.lastElementChild!
  const removalButton = exp.querySelector('[data-edit="delete"]')
  removalButton!.addEventListener('click', (e) => remove_expense(e))
  const editButton = exp.querySelector('[data-edit="change"]')
  editButton!.addEventListener('click', (e) => edit_expense(e))
}

document.getElementById('expense-adder')!.addEventListener('click', expense_adder)
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
