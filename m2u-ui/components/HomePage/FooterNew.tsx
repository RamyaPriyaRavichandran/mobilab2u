import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-20 pb-5">
        {/* Top Section: Logo + 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1.5fr_1.5fr] xl:grid-cols-[1.8fr_1fr_1.5fr_1.2fr] gap-x-12 gap-y-0 pb-10">
          {/* Logo + Description */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-start">
                <Link href="/">
                  <Image
                    src="/assets/images/svg/mobilab-logo.svg"
                    alt="MobiLab2u - Home Nursing & Healthcare Services in Malaysia"
                    title="MobiLab2u - Home Nursing & Healthcare Services in Malaysia"
                    width={120}
                    height={60}
                  />
                </Link>
              </div>
            </div>
            <p className="text-white mb-6 leading-relaxed text-[15px] font-medium max-w-sm">
              MobiLab2u connects you to doctors, labs, and care services right from the comfort of your home.
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="footer-links space-y-3 mb-5 sm:mb-0">
              <li>
                <Link
                  href="/"
                  title="Home page of MobiLab2u"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  title="About MobiLab2u"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  title="Home Healthcare Services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  title="Contact for Home Healthcare Services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="footer-links space-y-3 mb-5 sm:mb-0">
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Home Blood Sample Collection"
                  href="/services/home-blood-sample-collection"
                >
                  At home blood sample collection
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Tele Consultation"
                  href="/services/tele-consultation"
                >
                  Tele consultation
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Prescription Medication Delivery"
                  href="/services/medicine-delivery"
                >
                  Prescription Medicine delivery
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Home Care Services"
                  href="/services/home-care-services"
                >
                  Home Care - Home visits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="footer-links space-y-3 mb-5 sm:mb-0">
              <li>
                <a className="text-gray-400 hover:text-white transition-colors" href="mailto:info@mobilab2u.com">
                  info@mobilab2u.com
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition-colors" href="tel:+60125412990">
                  +60-12 541 2990
                </a>
              </li>
              <li>
                <p className="text-gray-400 hover:text-white transition-colors">
                  No.4A, Jalan SS 5B/4, SS 5,
                  <br />
                  Kelana,Jaya, 47301 Petaling
                  <br />
                  Jaya, Selangor,Darul Ehsan, Malaysia.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap justify-center items-center pb-8 border-b border-gray-700 leading-[2]">
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/johor" className="text-gray-400 hover:text-white transition-colors">
              Johor
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/selangor" className="text-gray-400 hover:text-white transition-colors">
              Selangor
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/kuala-lumpur" className="text-gray-400 hover:text-white transition-colors">
              Kuala Lumpur
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/klang-valley" className="text-gray-400 hover:text-white transition-colors">
              Klang Valley
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/penang" className="text-gray-400 hover:text-white transition-colors">
              Penang
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/perak" className="text-gray-400 hover:text-white transition-colors">
              Perak
            </Link>
          </li>
          <li className="px-4 border-r border-gray-700 last:border-r-0">
            <Link href="/sarawak" className="text-gray-400 hover:text-white transition-colors">
              Sarawak
            </Link>
          </li>
          <li className="px-4">
            <Link href="/sabah" className="text-gray-400 hover:text-white transition-colors">
              Sabah
            </Link>
          </li>
        </ul>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-gray-400 text-sm">
          <div className="flex flex-wrap items-center gap-4 justify-center text-center md:justify-start md:text-left">
            <p>MobiLab2u © 2025 | All rights reserved.</p>
            <Link href="/docs/M2U-Terms.pdf" className="text-white hover:underline">
              Privacy Policy
            </Link>
            <Link href="/docs/M2U-Terms.pdf" className="text-white hover:underline">
              Terms & Conditions
            </Link>
          </div>
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/MobiLab2u/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/images/svg/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </a>

            <a href="https://www.instagram.com/mobilab2u/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/images/svg/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </a>

            <a href="https://youtube.com/@mobilab2u" target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/images/svg/youtube.svg"
                alt="YouTube"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/mobilab2u-health-care-services-157596362"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/images/svg/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </a>

            <a
              href="https://www.tiktok.com/@mobilab2u?_r=1&_t=ZS-91AO6s0bCkf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/images/svg/tiktok.svg"
                alt="TikTok"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Fixed WhatsApp & Phone Buttons */}
      <div className="fixed right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
        <a href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="WhatsApp"
            title="Chat with us"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </a>

        <a href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="phone"
            title="Call us"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
            loading="lazy"
          />
        </a>
      </div>
    </footer>
  )
}
