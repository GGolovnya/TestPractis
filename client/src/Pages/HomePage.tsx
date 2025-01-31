
export function HomePage() {
  const numbers = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1);
console.log(numbers);

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(`Набор: ${evenNumbers}`); 


  return (
    <>
      <p>Стартовая верстка</p>
      <p>Тут типа будет расположена какая то верстка страница</p>
      <p>Ну и ссылки на страницы</p>
      
    </>
  )
}