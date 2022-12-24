import { deleteNote, editNote } from "./home.js";
let titleBuffer, textBuffer;

const makeElementWithClass = (eleType, ...classArray) => {
  const ele = document.createElement(eleType);
  ele.classList.add(...classArray);
  return ele;
};

const getTitleAndText = (e) => {
  const parent = e.target.parentNode.parentNode.parentNode.parentNode;
  const titleEle = parent.children[0];
  const textEle = parent.children[1];
  return [titleEle, textEle];
};

const handleEditButton = (e) => {
  const [titleEle, textEle] = getTitleAndText(e);
  const title = titleEle.innerText;
  const text = textEle.innerText;
  titleBuffer = title;
  textBuffer = text;
  titleEle.contentEditable = true;
  textEle.contentEditable = true;
  titleEle.style.backgroundColor = "#e6e6e6";
  textEle.style.backgroundColor = "#e6e6e6";
};

const makeNote = (title, text, _id = null) => {
  const div1 = makeElementWithClass("div", "col-lg-2", "p-4");
  const div2 = makeElementWithClass("div", "card", "p-3", "shadow-sm", "note");
  const h5 = document.createElement("h5");
  h5.innerHTML = title;
  const para = document.createElement("p");
  para.innerHTML = text;

  const delButton = makeElementWithClass("button", "delete-button");
  delButton.addEventListener("click", deleteNote);
  const delIcon = makeElementWithClass("i", "fas", "fa-trash");
  const editButton = makeElementWithClass("button", "edit-button");
  editButton.addEventListener("click", handleEditButton);
  const editIcon = makeElementWithClass("i", "fas", "fa-edit");
  const saveButton = makeElementWithClass("button", "save-button");
  saveButton.addEventListener("click", editNote);
  const saveIcon = makeElementWithClass("i", "fas", "fa-save");
  const objIdEle = document.createElement("div");
  objIdEle.style.display = "none";
  objIdEle.innerHTML = _id;
  const buttonsDiv = makeElementWithClass("div", "row", "text-center");
  const deleteDiv = makeElementWithClass("div", "col-4");
  const editDiv = makeElementWithClass("div", "col-4");
  const saveDiv = makeElementWithClass("div", "col-4");

  delButton.appendChild(delIcon);
  editButton.appendChild(editIcon);
  saveButton.appendChild(saveIcon);
  editDiv.appendChild(editButton);
  saveDiv.appendChild(saveButton);
  deleteDiv.appendChild(delButton);
  buttonsDiv.append(editDiv, saveDiv, deleteDiv);
  div2.append(h5, para, buttonsDiv, objIdEle);
  div1.appendChild(div2);

  let prev = document.querySelector("#store .row");
  prev.prepend(div1);
};

export { makeNote, getTitleAndText, titleBuffer, textBuffer };
