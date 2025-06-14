export default function Button({
  className,
  onClick,
  children,
  type,
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "close" | "delete";
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-fit items-center justify-center rounded-xl bg-blue-600 p-2 font-semibold transition-colors hover:bg-blue-800 ${className}`}
      type={
        type === "close"
          ? "button"
          : type === "delete"
            ? "button"
            : type === "submit"
              ? "submit"
              : "button"
      }
    >
      {children}
    </button>
  );
}
