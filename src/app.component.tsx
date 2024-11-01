import { Provider } from 'react-redux';
import { TodoPage as TodoPage } from './pages/todo/todo-page.component';
import { store } from './lib/redux/store';
import { Toaster } from './components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/error-page.component';
import { AuthPage } from './pages/auth/auth-page.component';
import { LoginForm } from './pages/auth/components/login-form.component';
import { RegisterForm } from './pages/auth/components/register-form.component';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <TodoPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <AuthPage title="Login" authForm={<LoginForm />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/register',
      element: <AuthPage title="Register" authForm={<RegisterForm />} />,
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
