import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 bg-gray-100 px-10 py-5">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={30}
          className="object-contain"
        />
      </div>

      <Link
        href="https://github.com/yeon0036/ringle-pre"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/githubLogo.png"
          alt="GitHub"
          width={36}
          height={36}
          className="object-contain"
        />
      </Link>
    </header>
  );
}
