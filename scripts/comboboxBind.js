const POSSIBLEPARAGRAPHS = ['Base-10 (decimal)', 'Base-2 (binary)', 'One\'s complement', 'Two\'s complement', 'Base-8 (octal)', 'Base-16 (hexadecimal)']

function BindComboboxEvent()
{
    let baseCombobox = document.getElementById('from-base');
    baseCombobox.onchange = function() { ChangeOutputParagraphs(this); }
}

function ChangeOutputParagraphs(fromBaseBox)
{
    let outputParagraphs = document.getElementsByClassName('outputs');
    let currentSelection = fromBaseBox.options[fromBaseBox.selectedIndex].text
    let i = 0
    let j = 0
    while (i <= outputParagraphs.length) {
        if (currentSelection == POSSIBLEPARAGRAPHS[i]) {
            i++
            continue
        }
        //console.log(outputParagraphs[i])
        outputParagraphs[j].innerText = POSSIBLEPARAGRAPHS[i] 
        i++
        j++
    }
}

window.onload = function() { BindComboboxEvent(); }