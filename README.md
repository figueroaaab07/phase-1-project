# phase-1-project

I will focus on the steps that I established and followed for the design of a Web page that accesses information through an API (Application Programming Interface). The steps were the following:

1.  Selection of the API within a set of alternatives presented by the Flatiron School instructors.  
    
    I decided on the API provided by the Metropolitan Museum of New York (The Met).  
    **API Used:** The Metropolitan Museum of Art Collection API (RESTful web service in JSON format) gives access to all of The Met's Open Access data and to corresponding high resolution images (JPEG format) that are in the public domain.

2.  Study what kind of information was available through the API, how to make a request and fetching a resource through the fetch method based on their respective Endpoints.

    **Endpoints Used:**  
    _**Object Request**_: https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]  
    A record for an object, containing all open access data about that object, including its image (if the image is available under Open Access).  
    _**Departments Request**_: https://collectionapi.metmuseum.org/public/collection/v1/departments  
    A listing of all valid departments, with their department ID and the department display name.  
    _**Objects ID by Department Request**_: https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=[Department(s) ID]  
    A listing of all Object IDs for objects that contain the search query within the object's data

3.  Initial proposal for the layout of the Web page based on the Project's development premises.  
    
    ![Web Page Layout](./images/web-page-layout.jpg)

4.  Delve into concepts that would be used in development.  
    
    **Among others**: Promises, specifically Promise.all, CSS elements like Horizontal Scrollbar Navigation and Modal.

5.  Selection of the name of the page that includes a brief description of what will be displayed on the page.  
    
    **Name**: Visiting the Metropolitan Museum of Art, New York  
    **Description**: Take a sample from more than 490,000 works, throughout the world and history, and and let yourself be carried away by the feelings they inspire.

6.  Establish the number of works images to display for each department selection, and how to determine your selection.  
    
    I decided on a random selection of 4 works based on the department selected.

7.  Set the information that will be displayed in the footer.  
    
    I decided to show the 2 locations of the Met in New York with their respective photo and contact information (address and phone).

8.  Establish and create the containing elements of the information that will be displayed based on the proposed layout (HTML Base).  
    
    **Function to create HTML Base**: createHtmlBase();  

    _**Header**_: Includes Name and Description (Tags: div, h1, p).  
    _**Selector Menu**_: Includes all Met Departments in a horizontal scrollable menu (Tags: div, h2, a).  
    _**Main Content**_: Includes 4 randomly selected images and a brief author reference, completion date and medium used of the works (if available), by the selected department (Tags: div, img, p).  
    _**Footer**_: Includes image and address for the 2 Met locations, in a scrollable menu with modal display (Tags: div, h2, a).

9.   Establish the functions that allow to populate the navigation elements and department selection (Met collections).  

      **Functions to populate scroll menu selector**:  
      populateSelector();  
      optionCb(event);

10.  Establish the functions that allow the images to be displayed, including a brief description of the author, year of completion, name of the work and material used for its manufacture.  
      
      **Functions to getting and displaying 4 random objects for selected department** (default Department ID 1: American Decorative Arts):  
      renderImagesByDepartment(selection);  getObjectData(objectID);  
      renderOneObject(objectData));  
      
      **Functions to getting and displaying Met Image and Address Location**:  
      createFooterModal();  
      footerModal(metLocation);

11.   Establish the Event Listeners.  
      
      **Event Listener for DOM**:  
      document.addEventListener;  
      
      **Event Listener for Department Selection**:  
      optionElement.addEventListener;  
      
      **Event Listener for Met Location Selection**:  
      footerOption.addEventListener;  
      
      **Event Listener for Remove Modal**:  
      closeButton.addEventListener;