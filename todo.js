/* eslint-disable no-console */
// 定義輸入框
const todoInput = document.getElementById('newTodo');
// 定義新增按鈕
const addBtn = document.getElementById('addTodo');
// 按鈕作動時觸發 addTodo 函式
const cleanAllBtn = document.getElementById('clearTask');
// const delBtn = document.querySelector('[data-action="remove"]');
const todoList = document.getElementById('todoList');
// 定義目前 TODO 數字
const countTodo = document.getElementById('taskCount');
// 當新增按鈕點擊時呼叫新增 TODO 函式
addBtn.onclick = () => {
  // 抓取輸入框內的字，並去除前後空白
  const newTodo = todoInput.value.trim();
  // 如果輸入不爲空，呼叫新增 TODO 函式
  if (newTodo !== '') {
    addTodo(newTodo);
    todoInput.value = '';
  }
}
// 定義全部清除按鈕，並將 TODO 資料陣列清空
cleanAllBtn.onclick = () => {
  todoData = [];
  renderTodo(todoData);
}
// 抓取 todoList 的點擊
todoList.addEventListener('click', getAction);

// 定義一個空陣列
var todoData =[];

// 新增 TODO 函式
function addTodo(newTodo) {
  // 取得時間戳
  const timeStamp = Date.now();
  // 若不爲空，將輸入框內文字與時間戳存入
  if (newTodo !== '') {
    todoData.push({
      id: timeStamp,
      title: newTodo,
      completed: false
    })
    renderTodo(todoData);

  }
}
// 呈現 TODO LIST
function renderTodo(data) {
  // 將要 APPEND 的 HTML 存入
  let str = '';
  data.forEach(item => {
    // 作業板型複製，建立一個新的 li 後塞入 ul 內
    str += `<li class="list-group-item">
    <div class="d-flex">
    <div class="form-check" data-action="complete" data-id="${item.id}">
    <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''}>
    <label class="form-check-label ${item.completed ? 'completed' : ''}"> ${item.title}</label>
    </div>
    <button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${item.id}">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    </li>`;
  });
  todoList.innerHTML = str;
  countTodo.textContent = todoData.length;
}

// 抓取 EVENT 的動作
function getAction(e) {
  // 判斷動作
  const action = e.target.parentNode.dataset.action;
  // 取得 data-id 的值
  const id = e.target.parentNode.dataset.id;
  // 判斷爲移除時，呼叫 REMOVE 函式
  if (action === 'remove') {
    remove(id);
  }
  // 判斷爲點擊完成的 CheckBox 時，呼叫 COMPLETE 函式
  if (action === 'complete') {
    complete(id);
  }
}

// REMOVE 函式
function remove(id) {
  let itemIndex = 0;
  todoData.findIndex((element, index) => {
    element.id === id;
    itemIndex = index;
  });
  todoData.splice(itemIndex, 1);
  renderTodo(todoData);
}

// COMPLETE 函式
function complete(id) {
  todoData.find(element=> {
    if(element.id === id){
      element.complete = element.complete ? true : false;
    }
  });
}