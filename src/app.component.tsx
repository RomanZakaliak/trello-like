import { Provider } from 'react-redux';
import { TodoPage as TodoPage } from './pages/todo/todo-page.component';
import { store } from './lib/redux/store';
import { Toaster } from './components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/error-page.component';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <TodoPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
};
