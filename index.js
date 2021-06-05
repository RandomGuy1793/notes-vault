function addNote() {
    var title=document.querySelector("#create .title").value;
    var text=document.querySelector("#create .text").value;
    if(title.trim() || text.trim()){
        var prev=document.querySelector("#store .row").innerHTML
        document.querySelector("#store .row").innerHTML = prev+
        `<div class="col-lg-3 p-4">
            <div class="card p-3 shadow-sm">
            <h5>`+title+`</h5>
            <p>`+text+`</p>
            </div>
        </div>`
    }
    document.querySelector("#create .title").value="";
    document.querySelector("#create .text").value="";
}