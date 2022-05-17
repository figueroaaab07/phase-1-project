document.addEventListener("DOMContentLoaded", () => {

  function createHtmlBase() {
    let divContainer = document.createElement('div');
    divContainer.className = "grid-container";
    let divHeader = document.createElement('div');
    divHeader.className = "header";
    let pHeader = document.createElement("p");
    pHeader.innerText = "Take a sample from more than 490,000 works, throughout the world and history, and and let yourself be carried away by the feelings they inspire"
    divHeader.appendChild(document.querySelector("h1"));
    divHeader.appendChild(pHeader);
    let divSelector = document.createElement('div');
    divSelector.className = "scrollselector";
    let pSelector = document.createElement("p");
    pSelector.textContent = "Please Select Collection to See Sample";
    let divScrollMenu = document.createElement('div');
    divScrollMenu.className = "scrollmenu";
    divSelector.appendChild(pSelector);
    divSelector.appendChild(divScrollMenu);
    let imageContainer = document.querySelector("#object-image-container");
    imageContainer.className = "row";
    let bodyElement = document.querySelector("body");
    divContainer.appendChild(divHeader);
    divContainer.appendChild(divSelector);
    divContainer.appendChild(imageContainer);
    bodyElement.appendChild(divContainer);
  }
  createHtmlBase();

  function populateSelector() {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
    .then(res => res.json())
    .then(departmentsData => departmentsData["departments"].forEach(department => {
      let selectorElement = document.querySelector('.scrollmenu');
      let optionElement = document.createElement('a');
      optionElement.className = "scrollmenu-item";
      optionElement.href = "#";
      optionElement.innerText = department["displayName"];
      optionElement.id = department["departmentId"];
      optionElement.addEventListener("click", optionCb)
      selectorElement.appendChild(optionElement);
    }))
  }
  populateSelector();

  function getObjectData(objectID) {
    return  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            .then(res => res.json())
  }

  function renderOneObject(objectData) {
    let divColumnImg = document.createElement('div');
    divColumnImg.className = "column";
    let imageElement = document.createElement('img');
    imageElement.className = "image";
    imageElement.src = objectData["primaryImage"];
    imageElement.alt = objectData["objectName"];
    imageElement.style = "width:100%";
    let pImage = document.createElement('p');
    pImage.innerText = `${objectData["artistDisplayName"]}\n${objectData["objectName"]}, ${objectData["objectEndDate"]}\n${objectData["medium"]}`
    divColumnImg.appendChild(imageElement);
    divColumnImg.appendChild(pImage);
    document.querySelector("#object-image-container").appendChild(divColumnImg);
  }

  function renderImagesByDepartment(departmentId = "1") {
    return  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`)
            .then(res => res.json())
            .then(objectsByDepartment => objectsByDepartment["objectIDs"].sort(() =>.5- Math.random()).slice(0, 4))
            .then(objectsIDsSelected => Promise.all(objectsIDsSelected.map(objectID => getObjectData(objectID))))
            .then(objectsData => objectsData.map(objectData => renderOneObject(objectData)))
  }

  function optionCb(event) {
    event.preventDefault();
    document.querySelector("#object-image-container").innerHTML = "";
    let selection = event.target.id;
    console.log(selection);
    renderImagesByDepartment(selection);
  }

  // function getValueSelector() {
  //   let optionSelected = document.querySelector("#selector");
  //   optionSelected.addEventListener("click", optionCb)
  // }

  renderImagesByDepartment(departmentId = "1");
  // getValueSelector();
})