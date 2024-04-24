export default function Header({children}: { children: any }) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Productos
        </h2>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        {children}
      </div>
    </div>
  );
}
