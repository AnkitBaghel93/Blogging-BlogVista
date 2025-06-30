import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-white to-pink-100 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Blog<span className="text-gray-800">Vista</span></h2>
          <p className="mt-2 text-sm leading-relaxed">
            A simple platform to write, share, and grow through blogging. <br />
            Powered by the MERN stack.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600">Create Blog</Link></li>
            <li><Link to="/signin" className="hover:text-blue-600">Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-blue-600">Sign Up</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        © 2025 Truly IAS. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
