function GetInput() {
    let baseCombobox = document.getElementById('from-base')
    let fromBase = baseCombobox.value

    let numBox = document.getElementById('num-input')
    let number = numBox.value

    let bitsBox = document.getElementById('frac-bits')
    let bits = bitsBox.value

    return {'fromBase': fromBase, 'number': number, 'bits': bits}
}