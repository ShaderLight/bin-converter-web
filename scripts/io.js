const BASES = ['10', '2', 'u1', 'u2', '8', '16']


function GetInput() {
    let baseCombobox = document.getElementById('from-base')
    let fromBase = baseCombobox.value

    let numBox = document.getElementById('num-input')
    let number = numBox.value

    let bitsBox = document.getElementById('frac-bits')
    let bits = bitsBox.value

    return {'fromBase': fromBase, 'number': number, 'bits': bits}
}


function Convert() {
    let output = []
    let inputData = GetInput()
    let converted = ''

    for(let i=0; i < BASES.length; i++) {
        if(BASES[i] == inputData['fromBase']) {
            continue
        }

        converted = FromDecConv(ToDecConv(inputData['number'], inputData['fromBase']), BASES[i], inputData['bits'])

        output.push(converted)
    }

    //console.log(output)

    return output
}


function SlideIn() {
    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {        
        //paragraphList[i].style.flexGrow = '1'
        paragraphList[i].style.animation = 'slide-in 200ms linear 0s 1 normal forwards'
    }
}


function SlideOut() {
    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {        
        //paragraphList[i].style.flexGrow = '0'
        paragraphList[i].style.animation = 'slide-out 200ms linear 0s 1 normal forwards'
    }
}


function UpdateParagraphs() {
    let convertedObject = Convert()
    let paragraphList = document.getElementsByClassName('outputs')
    setTimeout(SlideOut, 500)
    for(let i=0; i < paragraphList.length; i++) {        
        paragraphList[i].innerHTML = convertedObject[i]
    }
}


function Update() {
    SlideOut().done(UpdateParagraphs)
    SlideIn()
}


//https://stackoverflow.com/a/12140139 <3
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