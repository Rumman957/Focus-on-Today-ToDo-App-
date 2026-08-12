const addBtn = document.querySelector('.add-btn')
const tasksContainer = document.querySelector('.tasks-container')
const progressBar = document.querySelector('.progress-bar')

let tasks = []

function createTask() {
    const goalContainer = document.createElement('div')
    goalContainer.classList.add('goal-container')

    const checkBox = document.createElement('div')
    checkBox.classList.add('custom-checkbox')

    const checkImg = document.createElement('img')
    checkImg.src = './images/check-icon.svg'
    checkImg.classList.add('check-icon')
    checkImg.alt = 'check-icon'

    checkBox.append(checkImg)

    const taskInput = document.createElement('input')
    taskInput.type = 'text'
    taskInput.classList.add('goal-input')
    taskInput.placeholder = 'Add a goal'

    goalContainer.append(checkBox, taskInput)

    return {
        goalContainer,
        checkBox,
        taskInput
    }
}

function addTask() {

    const task = createTask()

    tasksContainer.append(task.goalContainer)

    const taskData = {
        text: "",
        completed: false
    }

    tasks.push(taskData)

    // Checkbox behavior

    task.checkBox.addEventListener('click', () => {
        if (task.taskInput.value.trim()) {
            task.goalContainer.classList.toggle('completed')
            taskData.completed = !taskData.completed

        }
        else {
            progressBar.classList.add('show-error')
        }
        saveData()

    })

    // Input behavior

    task.taskInput.addEventListener('input', (e) => {
        taskData.text = e.target.value
        saveData()

    })
    

    task.taskInput.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')

    })


}

function loadTask() {
    const savedTask = localStorage.getItem('tasks')

    if (savedTask !== null) {
        tasks = JSON.parse(savedTask)
    }

    render()
}

function render() {

    tasks.forEach((task) => {
        const taskElements = createTask()

        tasksContainer.append(taskElements.goalContainer)

        taskElements.taskInput.value = task.text

        if (task.completed) {
            taskElements.checkBox.parentElement.classList.add('completed')
        }
        // Chechbox behavior
        taskElements.checkBox.addEventListener('click', () => {
            if (task.text) {
                taskElements.goalContainer.classList.toggle('completed')
                task.completed = !task.completed

            }
            else {
                progressBar.classList.add('show-error')
            }
            saveData()

        })

        //  Input behavior

        taskElements.taskInput.addEventListener('input', (e) => {
            task.text = e.target.value
            saveData()
        })

        taskElements.taskInput.addEventListener('focus', () => {
            progressBar.classList.remove('show-error')

        })

    })
}


function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

addBtn.addEventListener('click', addTask)

loadTask()