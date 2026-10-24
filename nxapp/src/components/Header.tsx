
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-center gap-6 p-4 bg-gray-100">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link> 
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
