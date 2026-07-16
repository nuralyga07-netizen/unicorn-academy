import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold gradient-text">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        Страница не найдена
      </h2>
      <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
        Возможно, страница была перемещена или удалена. Проверьте адрес или вернитесь на главную.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all"
      >
        На главную
      </Link>
    </div>
  );
}
