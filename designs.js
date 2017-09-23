window.addEventListener('load', function() {
    // this boolean is used to let the user kind of "draw the pixels" on the table while the mouse button is pressed
    let isMouseDown = false;

    // select color input
    const colorInput = document.getElementById('colorPicker');
    let colorHexCode = colorInput.value;
    let oldColorHexCode = colorHexCode;

    // select size input
    const sizePicker = document.querySelector('#sizePicker');
    // used for form data
    let formData = undefined;

    // select table
    const table = document.getElementById('pixel_canvas');

    // on form submit
    sizePicker.onsubmit = drawGridOnSubmit; 

    // Set up event listeners
    // on color change
    colorInput.onchange = setColorOnChange;

    // on cell click, mouse over, mouse down, mouse up & drag 
    table.onclick = setCellBackgroundColor;
    table.onmouseover = setCellBackgroundColor;
    table.onmousedown = onMouseDown;
    table.onmouseup = onMouseUp;
    table.ondrag = onDrag;

    /**
     * @description Draws the grid on submit
     * @param {event} The event object (onsubmit)
     */
    function drawGridOnSubmit(event) {
        // prevent default behaviour
        event.preventDefault();

        // get form data
        formData = new FormData(sizePicker);

        // When size is submitted by the user, call makeGrid()
        makeGrid();
    }

    /**
     * @description Set the color code
     * @param {event} The event object (onchange)
     */
    function setColorOnChange(event) {
        // save old color code
        oldColorHexCode = colorHexCode;
        colorHexCode = event.target.value;
    }

    /**
     * @description Set background color of a cell
     * @param {event} The event object (onclick, onmousedown, onmouseup, onmouseover, ondrag)
     */
    function setCellBackgroundColor(event) {
        const cell = event.target;
        // is the mouse event on a table cell
        if ( isMouseDown && cell && cell.nodeName === 'TD' ) {
            // get the current color code, if any
            const cellStyleAttr = cell.hasAttribute('style') ? cell.getAttribute('style') : ''

            if ( cellStyleAttr.endsWith(colorHexCode) ) 
                cell.removeAttribute('style'); // remove the attribute
            else
                cell.setAttribute('style', 'background-color: ' + colorHexCode); // overwrite old value
        }
    }

    /**
     * @description Mouse is down, set cell bg color accordingly
     * @param {event} The event object (onmousedown)
     */
    function onMouseDown(event) {
        isMouseDown = true;
        setCellBackgroundColor(event)
    }

    /**
     * @description Mouse is up, set cell bg color accordingly 
     * @param {event} The event object (onmouseup)
     */
    function onMouseUp(event) {
        isMouseDown = false;
        setCellBackgroundColor(event)
    }

    /**
     * @description Set mouse down flag to false
     * @param {event} The event object (ondrag)
     */
    function onDrag(event) {
        isMouseDown = false;
    }

    /**
     * @description Draw the grid according the given form values (height & width)
     */
    function makeGrid() {
        // first remove first child element
        if ( table.firstElementChild )
            table.innerHTML = '';

        // add rows corresponding to the submitted height
        for ( let itHeight = 0; itHeight < formData.get('height'); itHeight++ ) {
            let newRow = table.insertRow(-1);
            // add cells on each row corresponding to the submitted width
            for ( let itWidth = 0; itWidth < formData.get('width'); itWidth++ ) {
                let newCell = newRow.insertCell(-1);
            }
        }
    }
});
