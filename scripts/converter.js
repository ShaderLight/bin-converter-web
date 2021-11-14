// Converts a number from base-10 to any base (up to 16), both fractional or integers, or two's and one's complements
function FromDecConv(x, toBase, bits=5) {
    let integralPart = parseInt(x.toString().split('.')[0])
    let fractionalPart = Math.abs(x - integralPart)

    if(toBase == 'u1') {
        return BinToU1(FromDecConv(integralPart, 2, bits))
    }

    if(toBase == 'u2') {
        return BinToU2(FromDecConv(x, 2, bits))
    }

    toBase = parseInt(toBase)

    if(fractionalPart == 0) {
        return FromDecConvInt(integralPart, toBase)
    }
    else {
        return FromDecConvInt(integralPart, toBase) + '.' + FromDecConvFrac(fractionalPart, toBase, bits)
    }
}


// Converts a number to base-10 from any base (up to 16), both fractional or integers, or two's and one's complements
function ToDecConv(x, fromBase) {
    let negative = 1

    if(x[0] == '-') {
        negative = -1
        x = x.slice(1)
    }

    let integralPart = x.toString().split('.')[0]
    let fractionalPart = x.toString().split('.')[1]

    if(fromBase == 'u1') {
        return U1ToDec(x)
    }
    if(fromBase == 'u2') {
        return U2ToDec(x)
    }

    fromBase = parseInt(fromBase)

    if(typeof fractionalPart == 'undefined') {
        return negative * ToDecConvInt(integralPart, fromBase)
    }

    return negative * (ToDecConvInt(integralPart, fromBase) + ToDecConvFrac(fractionalPart, fromBase))
}


// Converts a base-10 integer number into any base (up to 16)
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
function FromDecConvFrac(x, toBase, bits=5) {
    if(x >= 1) {
        throw 'Greater than 1 Error'
    }

    let integralPart
    let output = []

    while(bits > 0) {
        x *= toBase
        integralPart = parseInt(x.toString().split('.')[0])
        x -= integralPart

        if(integralPart >= 1) {
            output.push(integralPart.toString())
        }

        if(x == 0) {
            break
        }

        if(integralPart == 0) {
            output.push('0')
        }
        bits -= 1
    }

    output = TranslateValues(output)

    return output.join('')
}


// Converts to base-10 from any base integer
function ToDecConvInt(x, fromBase) {
    let output = 0

    x = DetranslateValues(x)

    for(let i=0; i < x.length; i++) {
        output += parseInt(x[i]) * fromBase ** (x.length - i - 1)
    }

    return output
}


// Converts to base-10 from any base, but the input must be the fractional part of the number only
function ToDecConvFrac(x, fromBase) {
    output = 0

    x = DetranslateValues(x)
    for(let i=0; i < x.length; i++) {
        output += parseInt(x[i]) * fromBase ** (-1 - i)
    }

    return output
}


// Translates integers greater than 9 in the given array into letters
function TranslateValues(x) {
    const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
    let intElement
    for(var i = 0; i < x.length; i++) {
        intElement = parseInt(x[i])

        if (intElement >= 10) {
            x[i] = LETTERS[intElement - 10]
        }
    }

    return x
}


// Detranslates letters into integers greater than 9, param x can be either a string or an array
function DetranslateValues(x) {
    const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
    let output = []
    let letterIndex
    let intElement

    for(const element of x) {

        intElement = parseInt(element)
        
        if(isNaN(intElement)) {
            letterIndex = LETTERS.indexOf(element)
            
            if(letterIndex >= 0) {
                output.push(10 + letterIndex)
            }
            else {
                output.push(element)
            }
        }
        else {
            output.push(parseInt(element))
        }
    }
    return output
}


// Converts a binary number into two's complement
function BinToU2(x) {
    if(x[0] == '-') {
        if(x[1] == '1') {
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


// Converts a binary number into one's complement, throws away the fractional part if present
function BinToU1(x) {
    let integralPart = x.split('.')[0]
    
    if(integralPart[0] == '-') {
        if(integralPart[1] == '1') {
            return Inversion('0' + integralPart.slice(1))
        }
        return Inversion(x.slice(1))
    }

    if(integralPart[0] == '0') {
        return integralPart
    }

    return '0' + integralPart
}


// Converts two's complement into a decimal number
function U2ToDec(x) {
    let integralPart = x.split('.')[0]
    let fractionalPart = x.split('.')[1]

    if(typeof fractionalPart == 'undefined') {
        return -1 * 2 ** (integralPart.length - 1) * parseInt(integralPart[0]) + ToDecConvInt(integralPart.slice(1), 2)
    }

    return -1 * 2 ** (integralPart.length - 1) * parseInt(integralPart[0]) + ToDecConvInt(integralPart.slice(1), 2) + ToDecConvFrac(fractionalPart, 2)
}


// Converts one's comeplement into a decimal number
function U1ToDec(x) {
    let integralPart = x.split('.')[0]

    return -1 * (2 ** (integralPart.length - 1) - 1) * parseInt(integralPart[0]) + ToDecConvInt(integralPart.slice(1), 2)
}


// Inverses all the bits in a binary number (given as an array or string)
function Inversion(x) {
    let output = ''
    for(const element of x) {
        if (element == '0') {
            output += '1'
            continue
        }
        if (element == '1') {
            output += '0'
        }
        else {
            output += element
        }
    }
    return output
}


// Adds one to the least significant bit in a binary number (given as an array or string)
function BinAddOneLsb(x) {
    let sepIndex = x.indexOf('.')
    let output

    for(let i=0; i < x.length; i++) {
        if(x[x.length - i - 1] == '0') {
            
            output = x.slice(0, x.length - i - 1) + '1' + '0'.repeat(x.slice(x.length - i).length)

            if(sepIndex >= 0) {
                output = output.slice(0, sepIndex) + '.' + output.slice(sepIndex + 1)
            }
            return output
        }
    }
    throw 'Overflow Error'
}