
let form=document.querySelector('#task_form');
let tasklist=document.querySelector('ul');
let clearBtn=document.querySelector('#clear_task_btn');
let filter=document.querySelector('#task_filter');
let taskInput=document.querySelector('#new_task');

form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask)
clearBtn.addEventListener('click', clearTask)
filter.addEventListener("keyup", filterTask)
document.addEventListener('DOMContentLoaded', getTasks)

function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }
    else{
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value +" "));
        let link=document.createElement('a')
        link.setAttribute('href', '#')
        link.innerHTML="x"
        li.appendChild(link)

        tasklist.appendChild(li);

        storeTaskLocalStore(taskInput.value)
        taskInput.value=" ";   
    }
    e.preventDefault();
}
//remove task
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure")){
            let ele=e.target.parentElement;
            //console.log(ele);
            ele.remove();
            ////call function
            removefromLS(ele);

        }
    }

}
//clear all task
function clearTask(e){
    //tasklist.innerHTML=" "
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild)
    }
    localStorage.clear();
}
/////////Filter Task
function filterTask(e){
        let text=e.target.value.toLowerCase();
        document.querySelectorAll('li').forEach(task=>{
            let item=task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text)!=-1){
                task.style.display="block"
            }
            else{
                task.style.display="none"
            }
        })
        //console.log(text);
}
///Local Storage Task
function storeTaskLocalStore(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

////////Create task 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task=>{
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task +" "));
        let link=document.createElement('a')
        link.setAttribute('href', '#')
        link.innerHTML="x"
        li.appendChild(link)

        tasklist.appendChild(li);
    })
}

///remove from local store function
function removefromLS(taskItme){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    let li=taskItme;
    li.removeChild(li.lastChild);
    // console.log(li.textContent.trim());
    tasks.forEach((task, index)=>{
        if(li.textContent.trim()===task){
            tasks.splice(index,1)
        }
    //console.log(index);
    });
    console.log(li);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));       
}