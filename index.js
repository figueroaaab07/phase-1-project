document.addEventListener("DOMContentLoaded", () => {

  function createHtmlBase() {
    let divContainer = document.createElement('div');
    divContainer.className = "grid-container";
    let divHeader = document.createElement('div');
    divHeader.className = "header";
    let h1Header = document.querySelector("h1");
    let pHeader = document.createElement("p");
    pHeader.innerText = "Take a sample from more than 490,000 works, throughout the world and history, and and let yourself be carried away by the feelings they inspire"
    divHeader.append(h1Header, pHeader);
    let divSelector = document.createElement('div');
    divSelector.className = "scrollselector";
    let h2Selector = document.createElement("h2");
    h2Selector.textContent = "Please Select Collection to See Sample";
    let divScrollMenu = document.createElement('div');
    divScrollMenu.className = "scrollmenu";
    divSelector.append(h2Selector, divScrollMenu)
    let imageContainer = document.querySelector("#object-image-container");
    imageContainer.className = "row";
    let divFooter = document.createElement('div');
    divFooter.className = "footer";
    let h2Footer = document.createElement("h2");
    h2Footer.textContent = "The Met Locations";
    let divScrollFooter = document.createElement('div');
    divScrollFooter.className = "scrollmenu";
    let firstFooterElement = document.createElement('a');
    firstFooterElement.className = "footer-item";
    firstFooterElement.innerText = "The Met Fifth Avenue";
    let secondFooterElement = document.createElement('a');
    secondFooterElement.className = "footer-item";
    secondFooterElement.innerText = "The Met Cloisters";
    divScrollFooter.append(firstFooterElement, secondFooterElement);
    divFooter.append(h2Footer, divScrollFooter);
    let bodyElement = document.querySelector("body");
    divContainer.append(divHeader, divSelector, imageContainer, divFooter);
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

  function createFooterModal() {
    const footerOptions = document.querySelectorAll(".footer-item");
    // get Met Location onclick
    footerOptions.forEach((footerOption) => {
      footerOption.addEventListener("click", (event) => {
            let metLocation = event.target.innerText.split(" ").join("");
            console.log(metLocation);
            //run modal function
            footerModal(metLocation);
        });
    });
  }
    //creating the modal
  function footerModal (location) {
    const modal = document.createElement("div");
    modal.className = "modal";
    //add the modal to the main section or the parent element
    document.querySelector(".footer").append(modal);
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    //creating the close button
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerText = "x";
    closeButton.addEventListener("click", closeModal);
    //adding image to modal
    const locationImage = document.createElement("img");
    locationImage.src = `./images/${location}.jpg`;
    const locationMet = document.createElement("b");
    locationMet.innerText = (location === "TheMetCloisters") ? "The Met Cloisters" : "The Met Fifth Avenue";
    const locationAddress = document.createElement("p");
    const addressFifthAve = "1000 Fifth Avenue\nNew York, NY 10028\nPhone: 212-535-7710";
    const addressCloisters = "99 Margaret Corbin Drive\nFort Tryon Park\nNew York, NY 10040\nPhone: 212-923-3700";
    locationAddress.innerText = (location === "TheMetCloisters") ? addressCloisters : addressFifthAve;
    modalContent.append(closeButton, locationImage, locationMet, locationAddress);
    modal.appendChild(modalContent);
    modal.classList.toggle("show-modal");
  }    
  
  function closeModal() {
    const modal = document.querySelector(".modal");
    console.log(modal);
    modal.remove();
  }

  renderImagesByDepartment(departmentId = "1");
  createFooterModal();
})