function FromDecConvInt(x, to_base) {
    let output = []

    if (x == 0) {
        return '0'
    }
    if (x < 0) {
        output.push('-')
        x = x * (-1)
    }

    while (x != 0) {
        output.push(x % to_base)
        x = Math.floor(x / to_base)
    }

    output.reverse()
    output = TranslateValues(output)

    if (output[output.length - 1] == '-') {
        output.pop()
        output.unshift('-')
    }
    let output_str = output.join('')

    return output_str
}


function TranslateValues(x) {
    const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
    let int_element
    for(var i = 0; i < x.length; i++) {
        try {
            int_element = parseInt(x[i])
        } catch (error) {
            continue
        }

        if (int_element >= 10) {
            x[i] = LETTERS[int_element - 10]
        }
    }

    return x
}


function DetranslateValues(x) {
    const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

    for(var i = 0; i < x.length; i++) {
        try {
            let int_element = parseInt(x[i])
        } catch (error) {
            let letterIndex = LETTERS.indexOf(x[i])
            if(letterIndex >= 0) {
                x[i] = 10 + letterIndex
            }
            else {
            }
        }
    }

    return x
}