export default function Button({
  className,
  onClick,
  children,
  type,
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'close' | 'delete';
}) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center w-fit p-2 bg-blue-600 rounded-xl font-semibold hover:bg-blue-800 transition-colors ${className}`}
      type={type === 'close' ? 'button' : type === 'delete' ? 'button' : type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
