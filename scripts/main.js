

class Class{
    constructor(Name, Type, Number, Section, Time){
        this.name = Name
        this.type = Type
        this.number = Number
        this.section = Section
        this.time = Time
    }
}


comp1 = new Class("comp1", "comp", "1000", "12", "3:30")
comp2 = new Class("comp2", "comp", "2000", "22", "2:30")
//var jsonText = JSON.stringify(obj);


localStorage.setItem(comp1.name, JSON.stringify(comp1))
localStorage.setItem('comp2', JSON.stringify(comp2))
console.log(JSON.parse(localStorage.getItem('comp1')))
console.log(JSON.parse(localStorage.getItem('comp2')))