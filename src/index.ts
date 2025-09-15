import {v4 as uuidV4} from 'uuid'

type Task = {
  id:string
  title:string
  completed:boolean
  createdAt:Date
}

// console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-title')

// type Tasklette = {
//   value:string
// }
// // testing forEach powers
// const demoTasks: Tasklette[] = ['a', 'b']
// demoTasks.forEach(value:demoTasks)


const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask:Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  addListItem(newTask)

  // reset input label on submission
  input.value = ""
  

})

function addListItem(task: Task){
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", ()=>{
    // update stored data to reflect if task is complete
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

// save tasks to local storage so we can fetch them on page refresh
function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem("TASKS")

  if (taskJSON == null) return []

  return JSON.parse(taskJSON)
}