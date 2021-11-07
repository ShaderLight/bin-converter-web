function FromDecConv(x, toBase, bits=5) {
    let integralPart = parseInt(x.toString().split('.')[0])
    let fractionalPart = x - integralPart

    if(fractionalPart == 0) {
        return FromDecConvInt(integralPart, toBase)
    }
    else {
        return FromDecConvInt(integralPart, toBase) + '.' + FromDecConvFrac(fractionalPart, toBase, bits)
    }
}


function ToDecConv(x, fromBase) {
    let negative = 1

    if(x[0] == '-') {
        negative = -1
        x = x.slice(1)
    }

    let integralPart = x.toString().split('.')[0]
    let fractionalPart = x.toString().split('.')[1]

    if(typeof fractionalPart == 'undefined') {
        return negative * ToDecConvInt(integralPart, fromBase)
    }

    return negative * (ToDecConvInt(integralPart, fromBase) + ToDecConvFrac(fractionalPart, fromBase))
}


function FromDecConvInt(x, toBase) {
    let output = []

    if (x == 0) {
        return '0'
    }
    if (x < 0) {
        output.push('-')
        x = x * (-1)
    }

    while (x != 0) {
        output.push(x % toBase)
        x = Math.floor(x / toBase)
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


// Takes positive float number less than 1 and converts it to any base (up to base-16)
// bits -> maximum factional bits to calculate (precision)
function FromDecConvFrac(x, toBase, bits) {
    if(x >= 1) {
        throw 'Greater than 1 Error'
    }

    let integralPart
    let output = []

    while(bits > 0) {
        x *= toBase
        integralPart = parseInt(x.toString().split('.')[0])
        x -= integralPart
        if(x == 0) {
            break
        }

        if(integralPart >= 1) {
            output.push(integralPart.toString())
        }
        else {
            output.push('0')
        }
        bits -= 1
    }

    output = TranslateValues(output)
    let output_str = ''

    for(let i=0; i < output.length; i++) {
        output_str += output[i]
    }
    return output_str
}


function ToDecConvInt(x, fromBase) {
    let output = 0

    x = DetranslateValues(x)

    for(let i=0; i < x.length; i++) {
        output += parseInt(x[i]) * fromBase ** (x.length - i - 1)
    }

    return output
}


function ToDecConvFrac(x, fromBase) {
    output = 0

    x = DetranslateValues(x)
    for(let i=0; i < x.length; i++) {
        output += parseInt(x[i]) * fromBase ** (-1 - i)
    }

    return output
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
    let output = []
    let letterIndex
    let intElement

    for(var i = 0; i < x.length; i++) {

        intElement = parseInt(x[i])
        
        if(isNaN(intElement)) {
            letterIndex = LETTERS.indexOf(x[i])
            
            if(letterIndex >= 0) {
                output.push(10 + letterIndex)
            }
            else {
                output.push(x[i])
            }
        }
        else {
            output.push(x[i])
        }
    }
    return output
}


function BinToU2(x) {
    if(x[0] == '-') {
        if(x[1] == '1') {
            console.log(Inversion('0' + x.slice(1)))
            x = Inversion('0' + x.slice(1))
        }
        else {
            x = Inversion(x.slice(1))
        }
        return BinAddOneLsb(x)
        }
    if(x[0] == '0') {
        return x
    }

    return '0' + x
}


function Inversion(x) {
    let output = ''
    for(let i = 0; i < x.length; i++) {
        if (x[i] == '0') {
            output += '1'
            continue
        }
        if (x[i] == '1') {
            output += '0'
            continue
        }
        else {
            output += x[i]
        }
    }
    return output
}


function BinAddOneLsb(x) {
    let sepIndex = x.indexOf('.')
    let output

    for(let i=0; i < x.length; i++) {
        if(x[x.length - i - 1] == '0') {
            
            output = x.slice(0, x.length - i - 1) + '1' + '0'.repeat(x.slice(x.length - i).length)
            console.log(output)

            if(sepIndex >= 0) {
                output = output.slice(0, sepIndex) + '.' + output.slice(sepIndex + 1)
            }
            return output
        }
    }
    throw 'Overflow Error'
}