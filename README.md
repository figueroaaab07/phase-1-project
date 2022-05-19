# phase-1-project

Name: Visiting the Metropolitan Museum of Art, New York

Description: Take a sample from more than 490,000 works, throughout the world and history, and and let yourself be carried away by the feelings they inspire.

API: The Metropolitan Museum of Art Collection API (RESTful web service in JSON format) gives access to all of The Met’s Open Access data and to corresponding high resolution images (JPEG format) that are in the public domain.

Endpoints Used: Object (Request: https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]): A record for an object, containing all open access data about that object, including its image (if the image is available under Open Access). Departments (Request: https://collectionapi.metmuseum.org/public/collection/v1/departments): A listing of all valid departments, with their department ID and the department display name.

Website Layout: Header: Includes Name and Description (Tags: div, h1, p). Selector Menu: Includes all Met Departments in a horizontal scrollable menu (Tags: div, h2, a). Main Content: Includes 4 randomly selected images and a brief author reference, completion date and medium used of the works (if available), by the selected department (Tags: div, img, p). Footer: Includes image and address for the 2 Met locations, in a scrollable menu with modal display (Tags: div, h2, a).

Event Listeners: Includes Event Listener for Department Selection, Event Listener for Met Location Selection and Event Listener for Remove Modal.
