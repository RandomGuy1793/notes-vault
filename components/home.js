import { makeNote, getTitleAndText, titleBuffer, textBuffer } from "./note.js";

const token = sessionStorage.getItem("jwt");
const isSkipped = sessionStorage.getItem('skipped')

const addNote = () => {
    let title = document.querySelector("#create .title").value;
    let text = document.querySelector("#create .text").value;
    if (title.trim() && text.trim()) {
        if (isSkipped) makeNote(title, text);
        else postNote(title, text);
    }
    document.querySelector("#create .title").value = "";
    document.querySelector("#create .text").value = "";
}

const getNotes = async () => {
    const res = await fetch('https://notes-vault.herokuapp.com/api/notes', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        data.forEach((obj) => {
            makeNote(obj.title, obj.text, obj._id)
        })
    }
}

const postNote = async (noteTitle, noteText) => {
    const obj = {
        title: noteTitle,
        text: noteText
    }
    const JsonData = JSON.stringify(obj);
    const res = await fetch('https://notes-vault.herokuapp.com/api/notes/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JsonData
    })
    if (res.status === 200) {
        const data = await res.json();
        const { title, text, _id } = data;
        makeNote(title, text, _id)
    }
}

const deleteNote = async (e) => {
    const parentOfObjIdDiv = e.target.parentNode.parentNode.parentNode.parentNode
    if (!isSkipped) {
        const objId = parentOfObjIdDiv.lastChild.innerText;
        const res = await fetch(`https://notes-vault.herokuapp.com/api/notes/delete/${objId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        })
        if (res.status !== 200) {
            return
        }
    }
    const ele2Remove = parentOfObjIdDiv.parentNode;
    ele2Remove.remove()
}

const editNote = async (e) => {
    const [titleEle, textEle]=getTitleAndText(e)
    const noteTitle=titleEle.innerText
    const noteText=textEle.innerText
    if(!isSkipped){
        const obj = {
            title: noteTitle,
            text: noteText
        }
        const parentOfObjIdDiv = titleEle.parentNode
        const objId=parentOfObjIdDiv.lastChild.innerText
        const JsonData = JSON.stringify(obj);
        const res = await fetch(`https://notes-vault.herokuapp.com/api/notes/edit/${objId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            body: JsonData
        })
        if (res.status !== 200) {
            titleEle.innerText=titleBuffer
            textEle.innerText=textBuffer
        }
    }
    titleEle.contentEditable=false;
    textEle.contentEditable=false;
    titleEle.style.backgroundColor='white'
    textEle.style.backgroundColor='white'
}

let addButton = document.querySelector('.add-note');
addButton.addEventListener('click', addNote);

const logOut = document.querySelector('.log-out');
logOut.addEventListener('click', () => {
    window.location.replace("../../index.html")
})

if (!isSkipped) getNotes();

export {deleteNote, editNote}


