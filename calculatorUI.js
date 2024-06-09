class CalculatorUI {
    constructor(engine) {
        this.engine = engine;
        this.currentInput = '';
        this.firstNumber = null;
        this.operator = null;
        this.displayElement = $('.display');
        this.logListElement = $('.logList');
        this.setupEventListeners();
    }

    setupEventListeners() {
        $('.number').on('click', (e) => this.handleNumber($(e.target).data('number')));
        $('.operator').on('click', (e) => this.handleOperator($(e.target).data('operator')));
        $('.equal').on('click', () => this.handleEqual());
        $('.delete').on('click', () => this.handleDelete());
        $('.logButton').on('click', () => this.toggleLog());
    }

    handleNumber(number) {
        this.currentInput += number;
        this.updateDisplay(this.currentInput);
    }

    handleOperator(operator) {
        if (this.currentInput === '') return;
        this.firstNumber = parseFloat(this.currentInput);
        this.operator = operator;
        this.currentInput = '';
    }

    handleEqual() {
        if (this.currentInput === '' || this.firstNumber === null || this.operator === null) return;
        const secondNumber = parseFloat(this.currentInput);
        const result = this.engine.calculate(this.firstNumber, this.operator, secondNumber);
        this.updateDisplay(result);
        this.updateLog();
        this.reset();
    }

    handleDelete() {
        this.currentInput = '';
        this.updateDisplay('');
    }

    toggleLog() {
        this.logListElement.toggle();
    }

    updateDisplay(value) {
        this.displayElement.text(value);
    }

    updateLog() {
        this.logListElement.empty();
        this.engine.getLog().forEach(entry => {
            const option = $('<option></option>').text(`${entry.firstNumber} ${entry.operator} ${entry.secondNumber} = ${entry.result}`);
            this.logListElement.append(option);
        });
    }

    reset() {
        this.currentInput = '';
        this.firstNumber = null;
        this.operator = null;
    }
}

$(document).ready(() => {
    const calculatorEngine = new CalculatorEngine();
    new CalculatorUI(calculatorEngine);
});
