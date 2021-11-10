const POSSIBLEPARAGRAPHS = ['Base-10 (decimal)', 'Base-2 (binary)', 'One\'s complement', 'Two\'s complement', 'Base-8 (octal)', 'Base-16 (hexadecimal)']

function BindComboboxEvent()
{
    let baseCombobox = document.getElementById('from-base');
    baseCombobox.onchange = function() { ChangeOutputParagraphs(this); }
}

function ChangeOutputParagraphs(fromBaseBox)
{
    let outputParagraphs = document.getElementsByClassName('output-lbls');
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


function fallbackCopyTextToClipboard(event) {
    let text = event.target.innerHTML
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
    }

    function copyTextToClipboard(event) {
        let text = event.target.innerHTML
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(event);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
    }


function BindParagraphs() {
    paragraphList = document.getElementsByClassName('outputs')
    for(let i = 0; i < paragraphList.length; i++) {
        paragraphList[i].addEventListener('click', function(event) {
            copyTextToClipboard(event)
        })
    }
}


function AttachTooltips() {
    paragraphList = document.getElementsByClassName('outputs')
    for(let i = 0; i < paragraphList.length; i++) {
        tippy(paragraphList[i], {duration: 1, content:'Click to copy to clipboard',  duration: 300, theme:'graystyle'})
    }
}


function BindAll () {
    BindComboboxEvent()
    BindParagraphs()
    AttachTooltips()
}

window.onload = function() { BindAll(); }