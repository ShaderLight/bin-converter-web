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


function Update() {
    let convertedObject = Convert()
    let paragraphList = document.getElementsByClassName('outputs')

    for(let i=0; i < paragraphList.length; i++) {
        paragraphList[i].innerHTML = convertedObject[i]
    }
}