
/// Global
document.querySelector('.side-bar-toggle').addEventListener('click', function() {
    toggleSideBar();    
});

document.querySelector('.fav-wrapper').addEventListener('click', toggleSideBar);

function toggleSideBar() {
    let sidebar = document.querySelector('.side-bar');
    sidebar.classList.toggle('active');    
    this.classList.toggle('active');
}
// document.querySelector('.side-bar-close').addEventListener('click', function() {
//     let sidebar = document.querySelector('.side-bar');
//     sidebar.classList.toggle('active');

//     let sideBarToggle = document.querySelector('.side-bar-toggle');
//     sideBarToggle.classList.toggle('active');
//     //console.log("toggle");
// });



// Radio Button Table Component
function CheckBoxTable(el, data) {
    this.container = el;
    this.data = data;
    this.init();    
}

CheckBoxTable.prototype.init = function() {    
    // Create child elements as necessary
    //console.log(this.data);
    if (this.data) {
        this.data.items.forEach(item => {
            let html = this.renderRow(item);
            //console.log(html);
            this.container.innerHTML += html;
        })
        this.container.innerHTML +=     `<div><span class='total-bill'>$0.00</span></div>`;          
    }

    const container = this.container;
    const checkBoxRows = [... this.container.querySelectorAll('.check-box')];

    // Add event handlers for hover effect
    checkBoxRows.forEach(item => item.addEventListener('mouseenter', function(e) {
        this.classList.add('hover');
    }));
    checkBoxRows.forEach(item => item.addEventListener('mouseleave', function(e) {
        this.classList.remove('hover');
    }))

    // Add event handlers for click effect
    checkBoxRows.forEach(item => item.addEventListener('click', handleMouseClick));

    // Hack to prevent a click on the checkbox from checking or unchecking the checkbox.
    checkBoxRows.forEach(item => item.querySelector('input[type=checkbox]')
                                     .addEventListener('click', (e) => {
                                        e.target.checked = !e.target.checked;
                                    }));

    function handleMouseClick(e) {              
        //console.log("handleMouseClick");

        // find the checkbox and make sure it is clicked.
        let checkBox = this.querySelector('input[type=checkbox]');
        checkBox.checked = !checkBox.checked;

        let selections = checkBoxRows  
                            .filter(item => item.querySelector('input[type=checkbox]').checked)
                            .reduce((result, item) => {
                                //("Current Total: " + result + ", " + item.dataset.price);
                                return Number(result) + Number(item.dataset.price);
                            }, 0);       

        // Capture the Title of this checkbox
        let title = this.dataset.value;
        //console.log(title + " - " + selections);

        let formattedBill = "$" + selections.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        container.querySelector('.total-bill').innerHTML = formattedBill;
    }
}


CheckBoxTable.prototype.renderRow = function(data) {
    // Data is: {"Title": "Item 1", "Subtext": "Subtext for Item 1", "Add-on": "$2.00", "Value": "Item 1", "Price": 2.00}
    let html = "";
    html += `<div class='check-box' data-value='${data.value}' data-price='${data.price}'>`;
    html +=     `<div class='check-box-square'>`;
    html +=         `<input type='checkbox'/>`;
    html +=     `</div>`;
    html +=     `<div class='check-box-text'>`;
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
            html += `<span class='sub-title'>${data.subtext}</span>`;            
        }
    }    
    html +=     `</div>`;    
    html += `</div>`;    
    return html;
}


// Create our new components
const checkBoxTableData1 = {
    items: [
        {title:'Two Ski Brewski Pilsner',  value:'1', price:3.75},
        {title:'Snow Slip Stout', subtext:'5.0% ABV', value:'2', price:4.25},
        {title:'Cloudcroft IPA', subtext:'7.3% ABV', addOn:'$5.00', value:'3', price:5.00},
        {title:'Vintage Imperial Stout', subtext2:'9.3% ABV | 70 IBU', addOn:'$6.00', value:'4', price:6.00},
    ]
};
var checkBoxTable1 = new CheckBoxTable(document.getElementById('checkBoxTable1'), checkBoxTableData1);



// ---------------------------------------------------------------------------------

// Radio Button Table Component
function RadioButtonTable(el, data) {
    this.container = el;
    this.data = data;
    this.init();    
}

RadioButtonTable.prototype.init = function() {
    // Create child elements as necessary
    //console.log(this.data);
    if (this.data) {
        this.data.items.forEach(item => {
            let html = this.renderRow(item);
            //console.log(html);
            this.container.innerHTML += html;
        })
    }

    const radioButtonRows = [... this.container.querySelectorAll('.radio-button')];

    // Add event handlers for hover effect
    radioButtonRows.forEach(item => item.addEventListener('mouseenter', function(e) {
        this.classList.add('hover-shadow');
    }));
    radioButtonRows.forEach(item => item.addEventListener('mouseleave', function(e) {
        this.classList.remove('hover-shadow');
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
        //console.log(title);
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
            html += `<span class='sub-title'>${data.subtext}</span>`;            
        }
    }    
    html +=     `</div>`;
    html += `</div>`;    
    return html;
}


// Create our new components
const radioButtonTableData1 = {
    items: [
        {title:'Old-Fashioned Doughnut', value:'1'},
        {title:'Bear Claw', subtext:'A sweet pastry filled with almond paste', value:'2'},
        {title:'Apple Fritter', subtext:'Apple chunks and cinnamon', addOn:'$2.00', value:'3'},
        {title:'Ice Cream Cone', subtext:'Two scoops of homemade ice cream', addOn:'$6.00', value:'4'},
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
        //console.log("Allow Multiple Selections: " + allowMultiple);

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
        //console.log(activities);  
        activityList.innerHTML = activities;  
    }    
};

/* START UP */

// Create our new components
var actionButtonRow = new ActionButtonRow(document.getElementById('actionButtonRow'), false);
var actionButtonRow2 = new ActionButtonRow(document.getElementById('actionButtonRow2'), true);

//console.log("--- Table of Contents ---");

// Hide the components
var components = document.querySelectorAll('.component-container');
components.forEach( item => item.classList.add('hidden'));


// Automate the table of contents
// -- <li class="toc-element" data-id="checkBoxTable1Container">Check Box Table</li>
let tocHtml = [... components].reduce((result, item) => {    
    let heading = item.querySelector('h2')
    if (heading) { heading = heading.innerText; }

    // Generate the html for this item.  If item is missing data, don't generate anything.
    let html = (heading !== null ? `<li class='toc-element' data-id='${item.id}'>${heading}</li>` : "");    

    return result + html;
 }, "");
 
 
// Event Delegation method to handle dynamically generated items
function showComponent(e) {    
    // hide all items
    components.forEach(i => i.classList.add('hidden'));
    // remove hidden from current item
    var id = e.target.dataset.id;    
    (id && document.querySelector(`#${id}`).classList.toggle('hidden'));      
}

const toc = document.querySelector('#toc') 
toc.innerHTML = tocHtml;
toc.addEventListener("click", showComponent)


// ---------------------------------------------------------------------------------

