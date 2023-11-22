 
var bodyElement = document.body;
bodyElement.addEventListener('mouseup', () => {

    var selectedText = getSelectedText();

    if (selectedText) {
        getMeaningOfTheWord(selectedText);
        console.log('Text selected: ' + selectedText);
    }

});

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
                alert(hindiText);
                // console.log(hindiText);
                // const myPopup = new Popup({
                //     id: "my-popup",
                //     title: `Hindi translation of the ${word} is :`,
                //     content: hindiText,
                // });
                // myPopup.show();
            } else {
                console.log( " else Result => ", hindiText);
            }
        })
        .catch((error) => {
            console.log('Error fetching translation:', error);
            alert(hindiText);
        });
}
 