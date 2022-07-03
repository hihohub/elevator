# elevator
- A combined text and image component.
- Two versions - javascript and css.
- Javascript version - only one elevator per page.
- - Javascript file elevator.js and CSS file elevator-js.css.
- - Minimal setup.
- - Place the id 'elevator' within any container tag (e.g. div).
- - Add descriptive text within the container tag.
- - Specify values for attributes **width** and **height**.
- - Specify optional **image** attribute with image address.
- CSS version - multiple elevators per page.
- - CSS file elevator.css with no javascript file.
- - Bootstrap style setup...requires particular tags with particular attributes.
- - Outer div tag with class 'elevator'.
- - Three inner tags - div for left door, text container, div for right door. 
- - Left door has class list "elevator-door elevator-left-door elevator-image elevator-left image".
- - Right door has same with 'left' replaced by 'right'.
- - For an image on the doors, place the address in the style attribute of the divs. Place the same image in both divs.
- - style="background-image:url('...');"
- - For no image on the doors, add the attribute 'elevator-door-without-image' to both doors but still keep the image attributes.
- - Finally, change the global variables in elevator.css to customize your elevators.
- - Each elevator will have the same values for all of the global variables. The only thing that will differ will be the images.

- - The text container may be any tag you like with a class of 'elevator-text-container'. We have tested paragraph tags, list tags, and a div containing headers and a paragraph.
