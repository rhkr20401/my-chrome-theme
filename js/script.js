//search
const searchInput = document.getElementById('search-input');

const showSearchResult = ()=>{
  let searchWord = searchInput.value;
  window.location.href = `https://www.google.com/search?q=${searchWord}`;
  searchWord="";
};
const enterKey = (e)=>{
  if(e.code==='Enter'){
    showSearchResult();
  }
};
searchInput.addEventListener('keypress',(e)=>{
  enterKey(e);
});

// clock + dark
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const body = document.querySelector('body');

const modifyNumber = (number) => {
  return parseInt(number) < 10 ? `0${number}` : `${number}`;
}
const setNowDate = (month, date, day) => {
  dateElement.textContent = `${month}월 ${date}일 ${day}`;
};
const getNowDate = ()=>{
  const nowDate = new Date();
  let week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let month = modifyNumber(nowDate.getMonth()+1);
  let date = modifyNumber(nowDate.getDate());
  let day = nowDate.getDay();
  setNowDate(month, date, week[day]); 
};

const setNowTime = (hour,minute)=>{
  timeElement.textContent = `${hour}:${minute}`;
};
const getNowTime = ()=>{
  const nowDate = new Date();
  let hour = modifyNumber(nowDate.getHours());
  let minute = modifyNumber(nowDate.getMinutes());
  setNowTime(hour,minute);
};

const darkMode = ()=>{
  const nowHour = new Date();
  if(nowHour>=6 && nowHour<=17){
    body.classList.remove('dark');
  }else{
    body.classList.add('dark');
  }
};

getNowDate();
getNowTime();
darkMode();
setInterval(getNowTime,1000);

// bookmark
const newBookmarkForm = document.getElementById("bookmark-item-input-form");
const newBookmarkFormBg = document.getElementById("bookmark-add-open");
const addBookmarkBtn = document.getElementById("bookmark-add-btn"); 
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const bookmarkItemList = document.getElementById("bookmark-list");

let bookmarkList = [];
if(localStorage.getItem("bookmarkList")){
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
}else{
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
}
//북마크 추가
const addBookmarkItem = () =>{
  let bookmarkList = [];
  if(localStorage.getItem("bookmarkList")){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  };

  let name = document.getElementById("new-bookmark-name-input").value;
  let url = document.getElementById("new-bookmark-url-input").value;
  let createAt = Date.now();

  bookmarkList.push({name:name, url:url,createAt:createAt});
  localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));

  document.getElementById("new-bookmark-name-input").value="";
  document.getElementById("new-bookmark-url-input").value="";

  setBookmarItem({name:name, url:url,createAt:createAt});
  newBookmarkOpen();
};

//북마크 모달 열기 함수
let isAddBtnClick = false;
newBookmarkForm.style.display = 'none';
newBookmarkFormBg.style.display = 'none';
const newBookmarkOpen = ()=>{
  isAddBtnClick = !isAddBtnClick;
  isAddBtnClick ? (newBookmarkForm.style.display = "block") : (newBookmarkForm.style.display="none");
  isAddBtnClick ? (newBookmarkFormBg.style.display = "block") : (newBookmarkFormBg.style.display="none");
};

const deleteBookmarkItem = (id) => {
  const isDelete = window.confirm("정말 삭제하시겠습니까?");

  if(isDelete){
    let bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    let nowBookmarkList = bookmarkList.filter((elm)=>elm.createAt !== id); 

    localStorage.setItem("bookmarkList",JSON.stringify(nowBookmarkList));
    document.getElementById(`bookmark-item-${id}`).remove();
  };
};

const setBookmarItem = (item) => {
  const bookmarkItem = document.createElement("div");
  bookmarkItem.classList.add("bookmark-item");
  bookmarkItem.id = `bookmark-item-${item.createAt}`;

  const bookmarkInfo = document.createElement("div");
  bookmarkInfo.classList.add("bookmark-info");

  const bookmarkUrl = document.createElement("a");
  bookmarkUrl.classList.add("bookmark-url");
  bookmarkUrl.href = item.url;
  bookmarkUrl.target = '_blank';

  const urlIcon = document.createElement("div");
  urlIcon.classList.add("url-icon");

  const urlIconImg = document.createElement("img");
  urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;

  const nameElement = document.createElement("div");
  nameElement.classList.add("name");
  nameElement.textContent = item.name;

  const bookmarkDelBtn = document.createElement("div");
  bookmarkDelBtn.textContent="삭제";
  bookmarkDelBtn.classList.add("del-btn");

  //(6)삭제함수 추가
  bookmarkDelBtn.addEventListener("click", () => {
    deleteBookmarkItem(item.createAt);
  });

  bookmarkItem.appendChild(bookmarkInfo);
  bookmarkItem.appendChild(bookmarkDelBtn);
  bookmarkInfo.appendChild(bookmarkUrl);
  bookmarkUrl.appendChild(urlIcon);
  bookmarkUrl.appendChild(nameElement);
  urlIcon.append(urlIconImg);   
  bookmarkItemList.appendChild(bookmarkItem);
};

const setBookmarkList = () => {
  bookmarkList.forEach((item) => {
    setBookmarItem(item);
  })
};

addBookmarkBtn.addEventListener("click", newBookmarkOpen);
addBtn.addEventListener("click", addBookmarkItem);
cancelBtn.addEventListener("click",newBookmarkOpen);
setBookmarkList();


//todo
const todoForm = document.getElementById('todo-form');
const todoInput = document.querySelector('.todo-input');
const todoUl = document.querySelector('.todo-ul');
const todoCount = document.querySelector('.todo-count');
const clearAll = document.querySelector('.clear-all');

let todos = [];

const save = ()=>{
  localStorage.setItem('todos',JSON.stringify(todos));
};

const updateCounts = () => {
  todoCount.textContent = todos.length;
};

const delItem = (e)=>{
  const target = e.target.parentElement;
  todos = todos.filter((todo)=>todo.id !== parseInt(target.id));
  save();
  target.remove();
  updateCounts();
}

const addItem = (todo)=>{
  const li = document.createElement('li');
  li.id = todo.id;

  const delBtn = document.createElement('i');
  const check = document.createElement('span');
  const checkBox = document.createElement('i');
  const span = document.createElement('span');
  const div = document.createElement('div');

  span.innerText = todo.text;
  check.className = 'check'
  checkBox.setAttribute('class','fa-regular fa-circle');

  check.addEventListener('click',function(){
    const isIng = checkBox.classList.contains('fa-regular');

    if(isIng){
      checkBox.classList.remove('fa-regular');
      checkBox.classList.add('fa-solid');
      span.style.cssText = 'text-decoration: line-through;'
    }else{
      checkBox.classList.remove('fa-solid');
      checkBox.classList.add('fa-regular');
      span.style.cssText = 'text-decoration: none;'
    }
  });

  delBtn.setAttribute('class','fa-solid fa-trash-can');
  delBtn.addEventListener('click',delItem);

  todoUl.appendChild(li);
  li.appendChild(div);
  div.appendChild(check);
  check.appendChild(checkBox);
  div.appendChild(span);
  li.appendChild(delBtn);

  updateCounts();
};

const handler = (e)=>{
  e.preventDefault();

  const todo = {
    id : Date.now(),
    text : todoInput.value,
  };

  if(todoInput.value !== ''){
    todos.push(todo);
    addItem(todo);
    save();
    todoInput.value = '';
  }
};

const init = ()=>{
  const userTodos = JSON.parse(localStorage.getItem('todos'));
  todoCount.textContent = 0;
  if(userTodos){
    userTodos.forEach((todo)=>{
      addItem(todo);
    });
    todos = userTodos;
    updateCounts();
  }
};

const clearItems = ()=>{
  todoUl.innerText = '';
  todoCount.textContent = 0;
  todos=[];
  localStorage.removeItem('todos');
};

init();
todoForm.addEventListener('submit',handler);
clearAll.addEventListener('click',clearItems);


//canvas
const canvas = document.querySelector('canvas');
const paintClear = document.querySelector('.paint-clear');
const paintSave = document.querySelector('.paint-save');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 190;

ctx.strokeStyle = '#2F3E4E';
ctx.lineWidth = 3;

paintClear.addEventListener('click',function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

paintSave.addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'paint.jpg';
    a.click();
  });
});

let painting = false;
function stopPainting(){
  painting = false;
}
function startPainting(){
  painting = true;
}

function onMouseMove(e){
  let x = e.offsetX;
  let y = e.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  }else{
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.lineCap = 'round';
  }
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}