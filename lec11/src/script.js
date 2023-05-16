// 1)-------------------------------

let fighters =["JON JONES","ALEXANDER VOLKANOVSKI","ISRAEL ADESANYA"]
console.log(fighters)

for ( let i = 0; i < fighters.length; i++) { 
    document.write("<center>" + "<br>" + fighters[i])
}


// for ( index in fighters) {
//     document.write("<center>" + "<br>" + fighters[index])
// }  ------- ინდექსის პრინციპი



// let index = 0 
// while ( index < fighters.length) {
//     console.log(fighters[index]);
//     index++;
// } --------- while 

// 2)----------------------------------------

function display(income, func) { 
    let message = func(income);
    document.write(message);
}
function calculateIncome(salary) {
    if (salary < 1000) return "<br>Bad income<br>";
    if (salary <= 1499 && salary >= 1000)  return "<br>Normal income<br>";
    else if (salary >= 1500) return "<br>Good income<br>";

}

display(1700, calculateIncome);


// 3)--------------------------------------

const number = [15,53,22,198,10,28,16,70,33,951]

for (let i = 0; i < number.length; i++) {
    if (number[i] % 2 !== 0) {
    console.log(number[i]);
    }
  }


