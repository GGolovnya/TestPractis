// Базовое функциональное выражение
const sum = function(a, b) {
    return a + b;
};

// Именованное функциональное выражение
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};