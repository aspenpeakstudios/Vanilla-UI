

// Radio Button Table Component
function RadioButtonTable(el, data) {
    this.container = el;
    this.data = data;
    this.init();    
}

RadioButtonTable.prototype.init = function() {
    // Create child elements as necessary
    console.log(this.data);
    if (this.data) {
        this.data.items.forEach(item => {
            let html = this.renderRow(item);
            console.log(html);
            this.container.innerHTML += html;
        })
    }

    const radioButtonRows = [... this.container.querySelectorAll('.radio-button')];

    // Add event handlers for hover effect
    radioButtonRows.forEach(item => item.addEventListener('mouseenter', function(e) {
        this.classList.add('hover');
    }));
    radioButtonRows.forEach(item => item.addEventListener('mouseleave', function(e) {
        this.classList.remove('hover');
    }))

    // Add event handlers for click effect
    radioButtonRows.forEach(item => item.addEventListener('click', handleMouseClick));

    function handleMouseClick(e) {
        // clear all checked radio buttons
        radioButtonRows.forEach(i => i.querySelector('input[type=radio]').checked = false);

        // find the radio button and make sure it is clicked.
        let radioButton = this.querySelector('input[type=radio]');
        radioButton.checked = true;

        // Capture the Title of this radiobutton
        let title = this.dataset.value;
        console.log(title);
    }
}

RadioButtonTable.prototype.renderRow = function(data) {
    // Data is: {"Title": "Item 1", "Subtext": "Subtext for Item 1", "Add-on": "$2.00", "Value": "Item 1"}
    let html = "";
    html += `<div class='radio-button' data-value='${data.value}'>`;
    html +=     `<div class='radio-button-circle'>`;
    html +=         `<input type='radio'/>`;
    html +=     `</div>`;
    html +=     `<div class='radio-button-text'>`;
    if (data.addOn) {
        html +=     `<div class='title'>`    ;
        html +=         `<span>${data.title}</span>`;
        html +=         `<span class='add-on'>${data.addOn}</span>`;
        html +=     `</div>`;
        if (data.subtext) {
            html += `<div class='sub-title'>`;
            html +=     `<span>${data.subtext}</span>`;
            html += `</div>`;
        }
    }
    else {
        html +=     `<span class='title'> ${data.title} </span>`;
        if (data.subtext) {            
            html += `<span>${data.subtext}</span>`;            
        }
    }    
    html +=     `</div>`;
    html += `</div>`;    
    return html;
}


// Create our new components
const radioButtonTableData1 = {
    items: [
        {title:'Item 1', value:'Item 1'},
        {title:'Item 2', subtext:'Subtext for Item 2', value:'Item 2'},
        {title:'Item 3', subtext:'Subtext for Item 3', addOn:'$2.00', value:'Item 2'},
        {title:'Hamburger', subtext:'Subtext for Item 4', addOn:'$12.00', value:'Item 4'},
    ]
};
var radioButtonTable1 = new RadioButtonTable(document.getElementById('radioButtonTable1'), radioButtonTableData1);


// ---------------------------------------------------------------------------------

// Action Button Row Component
function ActionButtonRow(el, multiple) {
    this.container = el;
    this.allowMultiple = multiple;
    this.init();
}

// Initialize the component
ActionButtonRow.prototype.init = function() {    

    // Get our elements
    const actionButtons = [... this.container.querySelectorAll('.action-button')];
    const activityList = this.container.querySelector('[name="activities"]');    


    // Add event handler for mouse over 
    actionButtons.forEach(item => item.addEventListener('mouseenter', function(e) {   
        this.classList.add('hover');
    }));

    // Add event handler for mouse out 
    actionButtons.forEach(item => item.addEventListener('mouseleave', function(e) {   
        this.classList.remove('hover');
    }));

    // Add event handler for mouse click
    actionButtons.forEach(item => item.addEventListener('click', handleMouseClick.bind(item, null, this.allowMultiple)));


    // Do stuff when item is clicked
    function handleMouseClick(el, allowMultiple) {
        console.log("Allow Multiple Selections: " + allowMultiple);

        let activities = "";

        if (allowMultiple === false) {
            actionButtons.forEach(i => i.classList.remove('pressed'));
            
        }
        this.classList.toggle('pressed');

        // Get the list of selected values        
        activities = actionButtons
                        .filter(item => item.classList.contains('pressed'))                         // Only take the pressed items
                        .reduce((result, item) => { return result + ", " + item.dataset.value}, "") // Concatenate all the values
                        .replace(/^(, )/,"");                                                       // Remove the leading comma-space.
        
        // Update the activity list on the screen so user can see what they clicked.
        console.log(activities);  
        activityList.innerHTML = activities;  
    }    
};


// Create our new components
var actionButtonRow = new ActionButtonRow(document.getElementById('actionButtonRow'), false);
var actionButtonRow2 = new ActionButtonRow(document.getElementById('actionButtonRow2'), true);


// ---------------------------------------------------------------------------------

