// import './style.css'
// import { setupCounter } from './counter.ts'

// WARNING: Global State Refactor Later!
let todos = 0

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button id="expense-adder"> + </button>
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

// const expense = (name: string, amount: string, desc: string) => `
//   <div>
//     <h2> ${name} </h2>
//     <h3> Amount: <span> ${amount} </span> </h3>
//     <p> Description: <span> ${desc.trim()} </span> </p>
//     <button data-edit="delete"> Remove Expense </button>
//     <button data-edit="edit"> Edit </button>
//   </div>
// `

// const editable_expense = (name: string, amount: number | string, desc: string) => `
//   <form onsubmit="return false">
//     <label for="name"> Name </label>
//     <input type="text" name="name" value="${name}"/>
//     <br>
//     <label for="amount"> Amount </label>
//     <input type="number" name="amount" value="${amount}"/>
//     <br>
//     <label for="description"> Description: </label>
//     <textarea name="description">${desc.trim()}</textarea>
//     <br>
//     <button data-edit="delete"> Remove Expense </button>
//     <button data-edit="save"> Save </button>
//   </form>
// `

const expense_row_template = (name: string, amount: number | string, desc: string) => `
  <tr>
    <td> ${name} </td>
    <td> ${amount} </td>
    <td> ${desc} </td>
    <td>
      <button data-edit="edit"> Edit </button>
      <button data-edit="delete"> Delete </button>
    </td>
  </tr>
`

const editable_row_template = (name: string, amount: number | string, desc: string) => `
  <tr>
    <td>
      <label for="name">Name: </label>
      <input type="text" value="${name}" name="name">
    </td>
    <td>
      <label for="amount">Amount: </label>
      <input type="text" value="${amount}" name="amount">
    </td>
    <td>
      <label for="description">Description: </label>
      <input type="text" value="${desc}" name="description">
    </td>
    <td>
      <button data-edit="save"> Save </button>
      <button data-edit="delete"> Delete </button>
    </td>
  </tr>
`

function remove_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const exp = elem.closest('tr')!
  exp.remove()
}

function save_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const row = elem.closest('tr')!
  const name = (row!.querySelector('[name="name"]')! as HTMLInputElement).value
  const amount = (row!.querySelector('[name="amount"]')! as HTMLInputElement).value
  const desc = (row!.querySelector('[name="description"]')! as HTMLInputElement).value
  row.insertAdjacentHTML('beforebegin', expense_row_template(name, amount, desc))
  row.querySelector('[data-edit="delete"]')?.removeEventListener('click', remove_expense)
  row.querySelector('[data-edit="save"]')?.removeEventListener('click', save_expense)
  const display_row = row?.previousElementSibling
  display_row!.querySelector('[data-edit="delete"]')?.addEventListener('click', (e) => remove_expense(e))
  display_row!.querySelector('[data-edit="edit"]')?.addEventListener('click', (e) => edit_expense(e))
  row!.remove()
}

function edit_expense(e: Event) {
  const elem = e.target as HTMLButtonElement
  const row = elem.closest('tr')!
  const name = row.cells[0].textContent!
  const amount = row.cells[1].textContent!
  const desc = row.cells[2].textContent!
  row.querySelector('[data-edit="delete"]')?.removeEventListener('click', remove_expense)
  row.querySelector('[data-edit="edit"]')?.removeEventListener('click', edit_expense)
  row.insertAdjacentHTML('beforebegin', editable_row_template(name, parseFloat(amount), desc))
  const edit_row = row.previousElementSibling!
  const btn = edit_row.querySelector('[data-edit="save"]')
  console.log(btn)
  btn?.addEventListener('click', (e) => save_expense(e))
  edit_row.querySelector('[data-edit="delete"]')?.addEventListener('click', (e) => remove_expense(e))
  row.remove()
}

function expense_adder() {
  todos++
  const table = document.querySelector('table > tbody')!
  table.insertAdjacentHTML('beforeend', expense_row_template(`Expense ${todos}`, "0", `Details for Expense ${todos}`))
  const row = table!.lastElementChild!
  const editButton = row.querySelector('[data-edit="edit"]')!
  const removalButton = row.querySelector('[data-edit="delete"]')!
  editButton.addEventListener('click', (e) => edit_expense(e))
  removalButton.addEventListener('click', (e) => remove_expense(e))
}

document.getElementById('expense-adder')!.addEventListener('click', expense_adder)
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
