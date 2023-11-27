 
var bodyElement = document.body;

var newDiv = document.createElement("div");

// Set the id and class properties
newDiv.id = "popover";
newDiv.className = "popover";

// Append the new div element to the body (or any other parent element)
document.body.appendChild(newDiv);

var popoverElement = document.getElementById('popover');
console.log(popoverElement, "popoverElements");
bodyElement.addEventListener('mouseup', () => {

    var selectedText = getSelectedText();

    if (selectedText) {
        getMeaningOfTheWord(selectedText);
        console.log('Text selected: ' + selectedText);
        popoverElement.style.display = 'block';
    }else{
        hidePopover();
    }

});

function hidePopover() {
    popoverElement.style.display = 'none';
}

function getSelectedText() {
    var selectedText = '';
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    return selectedText.trim();
}

function getMeaningOfTheWord(word) {
    let hindiText = '';
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURI(word)}`)
        .then(response => response.json())
        .then(result => {
            if (result[0] && result[0][0] && result[0][0][0]) {
                hindiText = result[0][0][0];
                popoverElement.innerHTML = ''
                var range = window.getSelection().getRangeAt(0);
                // Calculate the middle position of the range
                var middleX = (range.getBoundingClientRect().left)/1.1;
                var middleY = (range.getBoundingClientRect().top + range.getBoundingClientRect().bottom)/1.9;
        
                // Show the popover at the middle position
                popoverElement.style.display = 'block';
                popoverElement.style.left = middleX+30+ 'px';
                popoverElement.style.top = middleY + 'px';
                popoverElement.innerHTML = ''+hindiText;

                console.log("if result", hindiText);
            } else {
                console.log( " else Result => ", hindiText);
            }
        })
        .catch((error) => {
            console.log("else result", hindiText);
            console.log('Error fetching translation:', error);
        });
}
 