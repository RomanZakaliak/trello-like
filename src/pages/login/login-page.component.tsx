import { Header } from '@/components/header.component';
import { LoginForm } from './components/login-form.component';

export const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col justify-between bg-slate-50">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-start py-4">
        <div className="py-10 font-semibold">
          <h1 className="text-5xl">Login</h1>
        </div>
        <div className="md:1/2 w-full sm:w-3/4 lg:w-1/3">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};
