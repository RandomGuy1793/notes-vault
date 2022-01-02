const token=sessionStorage.getItem("jwt");
// console.log(token);
const isSkipped=sessionStorage.getItem('skipped')

const makeNote=(title, text, _id=null)=>{
    const div1=document.createElement('div');
    div1.classList.add('col-lg-2', 'p-4')

    const div2=document.createElement('div');
    div2.classList.add('card', 'p-3', 'shadow-sm', 'note');

    const h5=document.createElement('h5');
    h5.innerHTML=title;

    const para=document.createElement('p');
    para.innerHTML=text;

    const button=document.createElement('button');
    button.classList.add('delete');
    button.addEventListener('click', deleteNote);

    const objIdEle=document.createElement('div');
    objIdEle.style.display="none"
    objIdEle.innerHTML=_id

    const i=document.createElement('i');
    i.classList.add('fas', 'fa-trash')

    button.appendChild(i);
    div2.append(h5, para, button, objIdEle);
    div1.appendChild(div2);

    let prev = document.querySelector("#store .row");
    prev.prepend(div1);
}

const addNote=()=> {
    let title = document.querySelector("#create .title").value;
    let text = document.querySelector("#create .text").value;
    if (title.trim() && text.trim()) {
        if(isSkipped) makeNote(title, text);
        else postNote(title, text);
    }
    document.querySelector("#create .title").value = "";
    document.querySelector("#create .text").value = "";
}

let addButton=document.querySelector('.add-note');
addButton.addEventListener('click', addNote);

const getNotes=async()=>{
    const res=await fetch('http://localhost:4000/api/notes', {
        // mode: "no-cors",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    })
    if(res.status===200){
        const data=await res.json()
        console.log(data);
        data.forEach((obj)=>{
            makeNote(obj.title, obj.text, obj._id)
        })
    }
    
}

const postNote=async(noteTitle, noteText)=>{
    const obj={
        title: noteTitle,
        text: noteText
    }
    const JsonData=JSON.stringify(obj);
    console.log(JsonData);
    const res=await fetch('http://localhost:4000/api/notes/add', {
        // mode: "no-cors",
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JsonData
    })
    if(res.status===200){
        const data=await res.json();
        console.log(data);
        const {title, text, _id}=data;
        makeNote(title, text, _id)
    }
}

const deleteNote=async(e)=>{
    const ele=e.target;
    
    // console.log(ele);
    if(!isSkipped){
        const objId=ele.parentNode.parentNode.lastChild.innerText;
        console.log(objId);
        const res=await fetch(`http://localhost:4000/api/notes/delete/${objId}`, {
            // mode: "no-cors",
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        })
        if(res.status!==200){
            return
        }
        // e.target.parentNode.parentNode.parentNode.remove()
    }
    ele.parentNode.parentNode.parentNode.remove()
}

const logOut=document.querySelector('.log-out');
logOut.addEventListener('click', ()=>{
    window.location.replace("../../index.html")
})

if(!isSkipped) getNotes();


