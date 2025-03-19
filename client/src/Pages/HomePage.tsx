import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  
  return (
    <>
      <h1>HomePage - стартовая страница</h1>
      <p>Тут типа будет расположена какая то верстка страница</p>
      <p>Ну и ссылки на страницы</p>
      <button onClick={() => navigate('/accordion')}>
        Страница с сложным компонентом
      </button>
    </>
  )
}