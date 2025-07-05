import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 space-x-4">
      <h1 className="text-3xl font-bold underline text-red-600 mb-5">
        Hello world!
      </h1>
      <Link href="/login" className="text-blue-600 underline">
        Login
      </Link>
      <Link href="/signup" className="text-green-600 underline ml-4">
        Signup
      </Link>
    </div>
  );
}
