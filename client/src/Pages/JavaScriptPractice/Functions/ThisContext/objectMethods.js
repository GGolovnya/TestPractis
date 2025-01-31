// Пример методов объекта
const calculator = {
    value: 0,
    add(x) {
        this.value += x;
        return this;
    },
    subtract(x) {
        this.value -= x;
        return this;
    },
    getValue() {
        return this.value;
    }
};