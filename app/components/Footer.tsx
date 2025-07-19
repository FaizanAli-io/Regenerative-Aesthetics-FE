import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary-variant2 text-white text-lg">
      <div className="px-20 py-28 ">
        <div className="grid grid-cols-3">
          {" "}
          <div className="space-y-5">
            <Image
              src="/images/logo-white.svg"
              alt="Regenerative Aesthetics Logo"
              width={200}
              height={60}
              className="w-auto h-auto"
            />
            <p>
              We bring you premium hair and skincare essentials, carefully curated for ultimate
              nourishment and beauty
            </p>
          </div>
          <div>
            <ul className="space-y-5 text-xl ml-28">
              <li className="font-semibold">Services</li>
              <li>Haircare Bundle</li>
              <li>Skincare Kits</li>
              <li>Special Discount</li>
              <li>Service contract</li>
              <li>New Arrivals</li>
              <li>Payment Options</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-5 text-xl">
              <li className="font-semibold">Assistance to the buyer</li>
              <li>Find an order</li>
              <li>Terms of delivery</li>
              <li>Exchange and return of goods</li>
              <li>Guarantee</li>
              <li>Product Authenticity Guarantee</li>
              <li>Terms of use of the site</li>
            </ul>
          </div>
        </div>{" "}
        <div className="flex space-x-8">
          <Link href="#">
            <Image
              src="/icons/twitter.svg"
              alt="Twitter"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </Link>
          <Link href="#">
            <Image
              src="/icons/fb.svg"
              alt="Facebook"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </Link>
          <Link href="#">
            <Image
              src="/icons/tiktok.svg"
              alt="TikTok"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </Link>
          <Link href="#">
            <Instagram size={40} />
          </Link>
        </div>
        {/* Powered by The Byte Office Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
            <span>Powered by</span>
            <span className="font-medium text-white/90">The Byte Office</span>
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="https://www.linkedin.com/company/the-byte-office/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                <Linkedin size={16} />
              </Link>
              <Link
                href="mailto:thebyteoffice@gmail.com"
                className="hover:text-white transition-colors duration-200"
              >
                <Mail size={16} />
              </Link>
              <Link
                href="https://the-byte-office.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                <Globe size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
