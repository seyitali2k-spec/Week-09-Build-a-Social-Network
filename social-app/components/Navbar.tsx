import Link from "next/link";

export default function Navbar() {
return (
    <nav className="flex justify-between mb-6">
    <h1 className="font-bold">SocialApp</h1>

    <div className="space-x-4">
    <Link href="/">Home</Link>
    <Link href="/profile">Profile</Link>
    </div>
    </nav>
);
}