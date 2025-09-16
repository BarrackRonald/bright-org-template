import Link from "next/link";

export default function Footer({
  tagline,
  email,
  phone,
  address,
}: {
  tagline: string;
  email: string;
  phone: string;
  address: string;
}) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">BrightOrg</h3>
          <p className="text-sm">{tagline}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link href="/articles" className="hover:text-white">News</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>{address}</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} BrightOrg. All rights reserved.
      </div>
    </footer>
  );
}
