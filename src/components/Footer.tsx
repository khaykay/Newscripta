import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useNews } from "../context/NewsContext";
const Footer = () => {
  const{loading} =useNews()
  return (
    <footer
      className={`${
        loading
          ? "fixed bottom-0 w-full bg-gray-900 text-white py-6 mt-10"
          : "bg-gray-900 text-white py-6 mt-10"
      }bg-gray-900 text-white py-6 mt-10`}
    >
      <div className="container mx-auto  px-5 md:px-10 flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Newscripta</h2>
          <p className="text-sm text-gray-400">Stay informed, stay ahead.</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-sm">
          <li>
            <a href="/" className="hover:text-gray-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Media */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-5 h-5 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://linkedin.com/in/khaykay-samuel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5 hover:text-blue-500 transition" />
          </a>
          <a
            href="https://github.com/khaykay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5 hover:text-gray-400 transition" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-xs mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Newscripta. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
