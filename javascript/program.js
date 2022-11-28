console.log("hello world");

const varConst = 5;
console.log(varConst);

let hello = "hello";
console.log(hello);
hello = "bonjour";
console.log(hello);

const number = Number(prompt("Enter a number"))
if(number>0){
    console.log(number + " is positive")
}else{
    console.log(number + " is negative")
}

let i = 0
while (i <=number){
    console.log(i)
    i++
}

for(let counter = 1; counter <=5; counter++){
    console.log(counter)
}

function sayHello(greetings){
    console.log(greetings)
}

sayHello("bonjour")

class Person{
    constructor(name, adress, age){
        this.name = name
        this.adress = adress
        this.age = age
    }

    introduce(){
        console.log("My name is " + this.name + ", I live in " + this.adress + ", I am " + this.age + " years old.")
    } 
}

angele = new Person("Angèle", "Montpellier", 23)
angele.introduce()

let ages = [23, 15, 20, 22]
let ages2 = ages
ages2[0] = 24
for(p of ages){
    console.log(p)
}