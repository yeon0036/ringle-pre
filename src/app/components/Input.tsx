export default function Input({
  className,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  label,
}: {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label?: string;
}) {
  return (
    <div>
    {label && (
  <label className="text-sm font-medium text-gray-700 mb-1 block">
    {label}
  </label>
)}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border-b border-gray-300 ${className}`}
      required={required}
    />
    </div>
  );
}
