
// New Component
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
var actionButtonRow = new ActionButtonRow(document.getElementById('actionButtonRow2'), true);
