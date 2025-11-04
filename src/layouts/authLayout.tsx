import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center lg:min-h-[calc(100vh-100px)] mt-10 lg:mt-0 mb-5">
      <div className="bg-white/50 dark:bg-neutral-900/20 lg:p-12 rounded-xl shadow-xl w-full md:w-10/12 lg:w-full">
        <div className="grid lg:grid-cols-2 2xl:grid-cols-5 gap-8 items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
