const BASES = ['10', '2', 'u1', 'u2', '8', '16']


// Reads all the input fields and returns an object containing all the input data
function GetInput() {
    let baseCombobox = document.getElementById('from-base')
    let fromBase = baseCombobox.value

    let numBox = document.getElementById('num-input')
    let number = numBox.value

    let bitsBox = document.getElementById('frac-bits')
    let bits = bitsBox.value

    return {'fromBase': fromBase, 'number': number, 'bits': bits}
}


// Converts a number to all possible bases from the BASES array
function Convert() {
    let output = []
    let inputData = GetInput()
    let converted = ''

    for(const base of BASES) {
        if(base == inputData['fromBase']) {
            continue
        }

        converted = FromDecConv(ToDecConv(inputData['number'], inputData['fromBase']), base, inputData['bits'])

        output.push(converted)
    }

    return output
}


// Slides output paragraph to make it temporary invisible
function SlideIn() {
    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {        
        paragraphList[i].style.animation = 'slide-in 200ms linear 0s 1 normal forwards'
    }
}


// --- REPLACED ---
/*
// Slides output paragraph to make it visible again
function SlideOut() {
    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {        
        paragraphList[i].style.animation = 'slide-out 200ms linear 0s 1 normal forwards'
    }
}
*/


// Updates all the output fields with the converted values
function UpdateParagraphs() {
    let convertedObject = Convert()
    let paragraphList = document.getElementsByClassName('outputs')
    setTimeout(SlideOut, 500)
    for(let i=0; i < paragraphList.length; i++) {        
        paragraphList[i].innerHTML = convertedObject[i]
    }
}


// Main update function, updates output fields after checking if the input is correct
// Also animates the output field while updating
function Update() {
    if(CheckInput(GetInput()['number'])) {
        SlideOut().done(UpdateParagraphs) // Slide fields out of vision, and update them after the animation has finished
        SlideIn() // Slide them back in
    }
    else {
        let numBox = document.getElementById('num-input')
        numBox.value = 'Invalid input!'
    }
}


// https://stackoverflow.com/a/12140139 <3
// Makes javascript wait until all the animations are done
var SlideOut = function () {
    var r = $.Deferred();

    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {        
        paragraphList[i].style.animation = 'slide-out 200ms linear 0s 1 normal forwards'
    }
    setTimeout(function () {

        r.resolve();
    }, 300);

    return r;
    };


// Returns true if the input is a valid number, otherwise false
function CheckInput(input) {
    if(input == "") {
        return false
    }
    let inputAntipattern = /[^1234567890.-]/
    
    return !inputAntipattern.test(input)
}