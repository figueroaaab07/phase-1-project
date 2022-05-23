document.addEventListener("DOMContentLoaded", () => {

  // creating HTML base
  function createHtmlBase() {
    // creating main container
    let divContainer = document.createElement('div');
    divContainer.className = "main-container";
    // creating head container
    let divHeader = document.createElement('div');
    divHeader.className = "header";
    // obtaining h1 element
    let h1Header = document.querySelector("h1");
    let pHeader = document.createElement("p");
    pHeader.innerText = "Take a sample from more than 490,000 works, throughout the world and history, and and let yourself be carried away by the feelings they inspire"
    // adding elements to head container
    divHeader.append(h1Header, pHeader);
    // creating scroll selector container
    let divSelector = document.createElement('div');
    divSelector.className = "scrollselector";
    let h2Selector = document.createElement("h2");
    h2Selector.textContent = "Please Select Collection to See Sample";
    // creating scroll menu selector container
    let divScrollMenu = document.createElement('div');
    divScrollMenu.className = "scrollmenu";
    // adding elements to scroll selector
    divSelector.append(h2Selector, divScrollMenu)
    // obtaining and setting image container
    let imageContainer = document.querySelector("#object-image-container");
    imageContainer.className = "row";
    // creating footer container
    let divFooter = document.createElement('div');
    divFooter.className = "footer";
    let h2Footer = document.createElement("h2");
    h2Footer.textContent = "The Met Locations";
    // creating scroll menu footer container
    let divScrollFooter = document.createElement('div');
    divScrollFooter.className = "scrollmenu";
    let firstFooterElement = document.createElement('a');
    firstFooterElement.className = "footer-item";
    firstFooterElement.innerText = "The Met Fifth Avenue";
    let secondFooterElement = document.createElement('a');
    secondFooterElement.className = "footer-item";
    secondFooterElement.innerText = "The Met Cloisters";
    // adding elements to scroll menu footer
    divScrollFooter.append(firstFooterElement, secondFooterElement);
    // adding elements to footer
    divFooter.append(h2Footer, divScrollFooter);
    let bodyElement = document.querySelector("body");
    // adding elements to main
    divContainer.append(divHeader, divSelector, imageContainer, divFooter);
    // adding elements to body
    bodyElement.appendChild(divContainer);
  }

  // displaying objects onclick selection department
  function optionCb(event) {
    event.preventDefault();
    // removing previous objects
    document.querySelector("#object-image-container").innerHTML = "";
    let selection = event.target.id;
    // console.log(selection);
    // displaying new objects from selected department
    renderImagesByDepartment(selection);
  }

  // populating scroll menu selector
  function populateSelector() {
    // fetching departments data through Met API
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Status code error: " + response.status);
      }
    })
    // .then(res => res.json())
    .then(departmentsData => departmentsData["departments"].forEach(department => {
      let selectorElement = document.querySelector('.scrollmenu');
      // creating data container for each data element
      let optionElement = document.createElement('a');
      optionElement.className = "scrollmenu-item";
      optionElement.innerText = department["displayName"];
      optionElement.id = department["departmentId"];
      // adding Event Listener to select department
      optionElement.addEventListener("click", optionCb)
      // adding element to scroll menu selector
      selectorElement.appendChild(optionElement);
    }))
    .catch(error => alert(error))
  }

  // getting object data for ID
  function getObjectData(objectID) {
    // fetching object data through Met API
    return  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Status code error: " + response.status);
              }
            })
            .catch(error => alert(error))
            // .then(res => res.json())
  }

  // displaying object image and description 
  function renderOneObject(objectData) {
    // creating object container
    let divColumnImg = document.createElement('div');
    divColumnImg.className = "column";
    // creating object image container
    let imageElement = document.createElement('img');
    imageElement.className = "image";
    imageElement.src = objectData["primaryImage"];
    imageElement.alt = objectData["objectName"];
    imageElement.style = "width:100%";
    // creating object description container
    let pImage = document.createElement('p');
    pImage.innerText = `${objectData["artistDisplayName"]}\n${objectData["objectName"]}, ${objectData["objectEndDate"]}\n${objectData["medium"]}`
    // adding elements to object container
    divColumnImg.append(imageElement, pImage);
    // adding elements to parent object container
    let parentObjectContainer = document.querySelector("#object-image-container");
    parentObjectContainer.appendChild(divColumnImg);
  }

  // getting 4 random objects for selected department (default Department ID 1: American Decorative Arts)
  function renderImagesByDepartment(departmentId = "1") {
    // fetching department data through Met API
    return  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Status code error: " + response.status);
              }
            })
            // .then(res => res.json())
            .then(objectsByDepartment => objectsByDepartment["objectIDs"].sort(() =>.5- Math.random()).slice(0, 4))
            // agregating data object promises into departments promises
            .then(objectsIDsSelected => Promise.all(objectsIDsSelected.map(objectID => getObjectData(objectID))))
            // executing function to display each selected object
            .then(objectsData => objectsData.map(objectData => renderOneObject(objectData)))
            .catch(error => alert(error))
  }

  // getting Met Image and Address Location onclick footer-item
  function createFooterModal() {
    const footerOptions = document.querySelectorAll(".footer-item");
    footerOptions.forEach((footerOption) => {
      // adding Event Listener to select location
      footerOption.addEventListener("click", (event) => {
        // eliminating space for to get image file
        let metLocation = event.target.innerText.split(" ").join(""); 
        // console.log(metLocation);
        // excecuting modal function
        footerModal(metLocation);
      });
    });
  }
  
  // creating the modal container for display the Met Locations
  function footerModal(location) {
    // creating modal container
    const modal = document.createElement("div");
    modal.className = "modal";
    // adding the modal to footer element
    document.querySelector(".footer").append(modal);
    // creating modal-content container
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    // creating the modal close button
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerText = "x";
    // adding Event Listener to close button for to remove modal
    closeButton.addEventListener("click", closeModal);
    // creating image container for met image location 
    const locationImage = document.createElement("img");
    locationImage.src = `./images/${location}.jpg`;
    // creating elements container for met address location
    const locationMet = document.createElement("b");
    locationMet.innerText = (location === "TheMetCloisters") ? "The Met Cloisters" : "The Met Fifth Avenue";
    const locationAddress = document.createElement("p");
    const addressFifthAve = "1000 Fifth Avenue\nNew York, NY 10028\nPhone: 212-535-7710";
    const addressCloisters = "99 Margaret Corbin Drive\nFort Tryon Park\nNew York, NY 10040\nPhone: 212-923-3700";
    locationAddress.innerText = (location === "TheMetCloisters") ? addressCloisters : addressFifthAve;
    // adding elements to modal-content
    modalContent.append(closeButton, locationImage, locationMet, locationAddress);
    // adding modal-content to modal
    modal.appendChild(modalContent);
    // showing modal
    modal.classList.toggle("show-modal");
  }    
  
  // removing modal onclick close button
  function closeModal() {
    const modal = document.querySelector(".modal");
    // console.log(modal);
    modal.remove();
  }
  // executing function to create HTML Base
  createHtmlBase();

  // executing function to populate scroll menu selector
  populateSelector();

  // executing function to populate image container
  renderImagesByDepartment(departmentId = "1");

  // executing function to create footer modal
  createFooterModal();
})