# bin converter web ![Licence](https://img.shields.io/github/license/shaderlight/bin-converter-web) ![GitHub last commit](https://img.shields.io/github/last-commit/shaderlight/bin-converter-web)

<p align= "center">Converting binary stuff, but webpage</p>

<p align="center"> <a href="https://shaderlight.github.io/bin-converter-web"><strong><< GitHub Pages Deployment >></strong></a> </p>

---
## Functionality
- Converts integer numbers
- Converts fractional numbers
- Converts negative numbers
- Available bases and representations:
  - base-10 (decimal)
  - base-2 (binary)
  - base-8 (octal)
  - base-16 (hexadecimal)
  - two's complement (in source code written as *U2*)
  - one's complement (in source code written as *U1*)


---
## Notes
Converter doesn't round fractional numbers, resulting in precision highly dependent on the **fractional bits** (fractional numbers, written as **X** below) parameter. The converter only shows up to **X** fractional numbers and after exceeding this number, simply cuts the string to only show **X** fractrional numbers. <br>
It is advised to turn up the param and then to manually round the number. 

---
The accepted fractional delimiter is `.` only.