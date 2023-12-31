
let todos=[];

let todoDataList=document.getElementById("todo-data-list");
let saveButton=document.getElementById("save-todo");
let todoInputBar=document.getElementById("todo-input-bar");
let getPendingTodoButton=document.getElementById("get-todos");


getPendingTodoButton.addEventListener("click", () =>{
    todos=todos.filter((todo) => todo.status !="Finished");
    reRenderTodo();
})


todoInputBar.addEventListener("keyup", function toggleSaveButton(){
    let todoText=todoInputBar.value;
    if(todoText.length==0)
    {
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
    }
})

saveButton.addEventListener("click", function getTextAndAddTodo(){
    let todoText=todoInputBar.value;
    if(todoText.length==0) return;
    let todo={text:todoText,status:'In Progress',finishButtonText:'Finished'};
    todos.push(todo);
    addTodo(todo,todos.length); 
    todoInputBar.Value='';
})

function reRenderTodo(){
    todoDataList.innerHTML='';
    todos.forEach((element,idx) =>{
        addTodo(element,idx+1)
    })
}

function removeTodo(event){
    //console.log("click",event);
    let deleteButtonPress=event.target;
    let IndexToBeRemove=Number(deleteButtonPress.getAttribute("todo-idx"));
    todos.splice(IndexToBeRemove,1);
    reRenderTodo();
   
}

function finishToDo(event){
    let finishButtonPress=event.target;
    let IndexToBeFinish=Number(finishButtonPress.getAttribute("todo-idx"));
    if(todos[IndexToBeFinish].status=="Finished")
    {
        todos[IndexToBeFinish].status="In Progress";
        todos[IndexToBeFinish].finishButtonText="Finished";   
    }
    else{
        todos[IndexToBeFinish].status="Finished";
        todos[IndexToBeFinish].finishButtonText="Undo";
    }
    todos.sort((a,b) => {
        if(a.status=="Finished")
        {
            return 1;
        }
        return -1;
    })   
    
    reRenderTodo();
}


function editTodo(event){
    let editButtonPress=event.target;
    let indexToEdit=Number(editButtonPress.getAttribute("todo-idx"));
    let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input=document.querySelector(`input[todo-idx="${indexToEdit}"]`);
    detailDiv.style.display="none";
    input.type="text";
    input.value=detailDiv.textContent;

}

function saveEditedTodo(event){
    let input=event.target;
    let indexToEdit=Number(input.getAttribute("todo-idx"));
    let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    

    if(event.keyCode==13){
        detailDiv.textContent=input.value;
        detailDiv.style.display="block";
        input.value='';
        input.type="hidden";
    }
    console.log(event.keyCode)
}

function addTodo(todo,todoCount){

    console.log("Hi");
    let rowDiv=document.createElement("div");
    let todoItem=document.createElement("div");
    let todoNumber=document.createElement("div");
    let todoDetail=document.createElement("div");
    let todoStatus=document.createElement("div");
    let todoAction=document.createElement("div");
    let deleteButton=document.createElement("button");
    let finishButton=document.createElement("button");
    let editButton=document.createElement("button");
    let hiddenInput=document.createElement("input");
    let hr=document.createElement("hr");

    //adding classess
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item","d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoAction.classList.add("todo-action","d-flex","justify-content-start","gap-2");
    deleteButton.classList.add("btn", "btn-danger","delete-todo");
    finishButton.classList.add("btn" ,"btn-success","finish-todo");
    editButton.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control", "todo-detail");

    //Adding attribute
    deleteButton.setAttribute("todo-idx",todoCount-1);
    finishButton.setAttribute("todo-idx",todoCount-1)
    editButton.setAttribute("todo-idx",todoCount-1);
    todoDetail.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);
    hiddenInput.type="hidden";

    //Adding click Listner
    deleteButton.onclick=removeTodo;
    finishButton.onclick=finishToDo;
    editButton.onclick=editTodo;
    hiddenInput.addEventListener("keypress",saveEditedTodo);
    

    
    

    todoDetail.textContent=todo.text;  //sent the todo text sent from input element
    todoNumber.textContent=`${todoCount}.`;
    todoStatus.textContent=todo.status;
    deleteButton.textContent="Delete";
    finishButton.textContent=todo.finishButtonText;
    editButton.textContent="Edit";
    // creating the div in DOM
    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishButton);
    todoAction.appendChild(editButton)
    // todoItem.appendChild(hiddenInput);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);
    

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);
}