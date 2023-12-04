const totalDelete = document.querySelector('[data-totalDelete]');
const erase = document.querySelector('[data-delete]');
const porcent = document.querySelector('[data-porcent]');
const iqual = document.querySelector('[data-iqual]');
const operators = document.querySelectorAll('[data-operator]');
const numbers = document.querySelectorAll('[data-number]');
const pantallaSuperior = document.getElementById('pantallaSuperior');
const pantallaInferior = document.getElementById('pantallaInferior');

class Calculator {
    constructor(pantallaSuperior, pantallaInferior){
        this.pantallaSuperior = pantallaSuperior;
        this.pantallaInferior = pantallaInferior;
    }

    clear () {
        this.valorSuperior = '0';
        this.valorInferior = '0';
        this.operator = '';
        this.updateDisplay();
    }

    eraseLastValue () {
      this.valorInferior = this.valorInferior.slice(0,-1);
      if(this.valorInferior === ''){
        this.valorInferior = '0';
      }
      this.updateDisplay();
    }

    updateDisplay () {
        this.pantallaSuperior.innerText = this.valorSuperior + this.operator;
        this.pantallaInferior.innerText = this.valorInferior;
    }

    insertNumber (number) {
        if(number === '.' && this.valorInferior.includes('.'))return;
        this.valorInferior === '0' 
            ? this.valorInferior = number
            : this.valorInferior += number;

        this.updateDisplay();
    }

    insertOperator (operator) {

        if(this.operator){
            this.calculate()
        }

        this.operator = operator;
        
        this.valorInferior === '0' 
            ? this.valorSuperior = this.valorSuperior
            : this.valorSuperior = this.valorInferior;

        this.valorInferior = '0';
        this.updateDisplay();
        
    }

    calculate (){
        switch (this.operator){
            case '÷':
                this.valorSuperior /= this.valorInferior;
                break;
            case 'x':
                this.valorSuperior *= this.valorInferior;
                break;
            case '-':
                this.valorSuperior -= this.valorInferior;
                break;

            case '+':
                this.valorSuperior = +this.valorSuperior +  +this.valorInferior;
                break;
        }
        this.valorInferior = '0';
        this.operator = '';
        this.updateDisplay();
    }
}


const calculator = new Calculator(pantallaSuperior, pantallaInferior);


totalDelete.addEventListener('click',()=>{
    calculator.clear();
})

erase.addEventListener('click', () => {
    calculator.eraseLastValue();
})

numbers.forEach(number => {
    number.addEventListener('click', ()=>{
        calculator.insertNumber(number.innerText);
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', ()=> {
        calculator.insertOperator(operator.innerText);
    })
})

iqual.addEventListener('click', ()=>{
    calculator.calculate();
})

// let pantalla = document.getElementById('display');
// monitorEvents(pantalla);
