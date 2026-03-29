import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import "./footer.css"

export default function Footter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <Image src="/logo.png" width={40} height={40} alt="Super Handlers logo" className="rounded-lg" style={{ width: 40, height: 40 }} unoptimized />
              <span className="footer-logo-text">Super Handlers</span>
            </Link>
            <p className="footer-tagline">
              Your trusted partner for premium forklift solutions. Excellence in material handling across the GTA.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/Shandlers/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              {/* <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a> */}
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/">Home</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/shop">Sales</Link></li>
              <li><Link href="/shop">Rental</Link></li>
              <li><Link href="/contact">Maintenance</Link></li>
              <li><Link href="/contact">Parts</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <Link href="tel:+1 647-573-0160" className="contact-item">
                  <span className="contact-icon"><FaPhoneAlt /></span>
                  <span>+1 (647) 573-0160</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:superhandlers1@gmail.com" className="contact-item">
                  <span className="contact-icon"><FaEnvelope /></span>
                  <span>superhandlers1@gmail.com</span>
                </Link>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/ZufwDGCdrLqQB7QJ6" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="contact-icon"><FaMapMarkerAlt /></span>
                  <span>11 Holland Dr, Unit 9, Bolton, ON L7E 1G7, Canada</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Super Handlers. All rights reserved.</p>
        <div className="footer-legal">
          <Link href="/about">Privacy Policy</Link>
          <Link href="/about">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
