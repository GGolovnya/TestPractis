// Анонимная функция в callback
setTimeout(function() {
    console.log('Executed after delay');
}, 1000);

// Анонимная функция в обработчике события
document.addEventListener('click', function(event) {
    console.log('Clicked at:', event.clientX, event.clientY);
});