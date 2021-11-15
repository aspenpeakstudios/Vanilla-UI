
// New Component
function ActionButtonRow(el, multiple) {
    this.container = el;
    this.allowMultiple = multiple;
    this.init();
}

// Initialize the component
ActionButtonRow.prototype.init = function() {    

    const actionButtons = [... this.container.querySelectorAll('.action-button')];

    // Add mouse over 
    actionButtons.forEach(item => item.addEventListener('mouseenter', function(e) {   
        this.classList.add('hover');
    }));

    // Add mouse out 
    actionButtons.forEach(item => item.addEventListener('mouseleave', function(e) {   
        this.classList.remove('hover');
    }));


    // Add mouse click
    actionButtons.forEach(item => item.addEventListener('click', handleMouseClick.bind(item, null, this.allowMultiple)));

    function handleMouseClick(el, allowMultiple) {
        console.log("Allow Multiple Selections: " + allowMultiple);

        if (allowMultiple === false) {
            actionButtons.forEach(i => i.classList.remove('pressed'));
        }
        this.classList.toggle('pressed');
        
        console.log(this.dataset.value);
    }    
};


// Create our new components
var actionButtonRow = new ActionButtonRow(document.getElementById('actionButtonRow'), false);
var actionButtonRow = new ActionButtonRow(document.getElementById('actionButtonRow2'), true);
