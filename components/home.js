const makeNote=(title, text)=>{
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
    button.addEventListener('click', e=> e.target.parentNode.parentNode.parentNode.remove());

    const i=document.createElement('i');
    i.classList.add('fas', 'fa-trash')

    button.appendChild(i);
    div2.append(h5, para, button);
    div1.appendChild(div2);

    let prev = document.querySelector("#store .row");
    prev.prepend(div1);
}

const addNote=()=> {
    let title = document.querySelector("#create .title").value;
    let text = document.querySelector("#create .text").value;
    if (title.trim() || text.trim()) {
        makeNote(title, text);
    }
    document.querySelector("#create .title").value = "";
    document.querySelector("#create .text").value = "";
}

export {addNote};
