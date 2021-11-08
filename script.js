let addNote=()=> {
    let title = document.querySelector("#create .title").value;
    let text = document.querySelector("#create .text").value;
    if (title.trim() || text.trim()) {
        let prev = document.querySelector("#store .row").innerHTML
        document.querySelector("#store .row").innerHTML =
            `<div class="col-lg-2 p-4">
            <div class="card p-3 shadow-sm note">
            <h5> ${title} </h5>
            <p> ${text} </p>
            <button class="delete" onclick="deleteNote(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>` + prev
    }
    document.querySelector("#create .title").value = "";
    document.querySelector("#create .text").value = "";
}

let deleteNote=(btn)=> {
    btn.parentNode.parentNode.remove();
}