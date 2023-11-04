// import './style.css'
import { setupCounter } from './counter.ts'

// WARNING: Global State Refactor Later!
let todos = 0

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button id="expense-adder"> + </button>
    <div id="expenses"></div>

    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Amount </th>
          <th> Description </th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
`

const expense = (name: string, amount: string, desc: string) => `
  <div>
    <h2> ${name} </h2>
    <h3> Amount: <span> ${amount} </span> </h3>
    <p> Description: <span> ${desc.trim()} </span> </p>
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="edit"> Edit </button>
  </div>
`

const editable_expense = (name: string, amount: number, desc: string) => `
  <form onsubmit="return false">
    <label for="name"> Name </label>
    <input type="text" name="name" value="${name}"/>
    <br>
    <label for="amount"> Amount </label>
    <input type="number" name="amount" value="${amount}"/>
    <br>
    <label for="description"> Description: </label>
    <textarea name="description">${desc.trim()}</textarea>
    <br>
    <button data-edit="delete"> Remove Expense </button>
    <button data-edit="save"> Save </button>
  </form>
`

const expense_row_template = (name: string, amount: number | string, desc: string) => `
  <tr>
    <td> ${name} </td>
    <td> ${amount} </td>
    <td> ${desc} </td>
    <td>
      <button> Edit </button>
      <button> Delete </button>
    </td>
  </tr>
`


function remove_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const exp = elem.parentElement
  exp!.remove()
}

function save_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const form = elem.closest('form')
  const name = (form!.querySelector('[name="name"]')! as HTMLInputElement).value
  const amount = (form!.querySelector('[name="amount"]')! as HTMLInputElement).value
  const desc = (form!.querySelector('[name="description"]')! as HTMLInputElement).value!
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
  const name = exp?.querySelector('h2')?.textContent
  const amount = parseFloat(exp?.querySelector('h3 > span')?.textContent!)
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
  const table = document.querySelector('table > tbody')
  todos++
  expense_list!.insertAdjacentHTML('beforeend', expense(`Expense ${todos}`, "0", `Details for Expense ${todos}`))
  table!.insertAdjacentHTML('beforeend', expense_row_template(`Expense ${todos}`, "0", `Details for Expense ${todos}`))
  const exp = expense_list!.lastElementChild!
  const removalButton = exp.querySelector('[data-edit="delete"]')
  removalButton!.addEventListener('click', (e) => remove_expense(e))
  const editButton = exp.querySelector('[data-edit="edit"]')
  editButton!.addEventListener('click', (e) => edit_expense(e))
}

document.getElementById('expense-adder')!.addEventListener('click', expense_adder)
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
