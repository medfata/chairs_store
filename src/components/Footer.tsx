"use client";

import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ChairCraft</h3>
            <p className="text-gray-300 text-sm">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/chairs" className="text-gray-300 hover:text-white text-sm">
                  {t('nav.chairs')}
                </Link>
              </li>
              <li>
                <Link href="/chair-pieces" className="text-gray-300 hover:text-white text-sm">
                  {t('nav.chairPieces')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white text-sm">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white text-sm">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-white text-sm">
                  {t('footer.warranty')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white text-sm">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <address className="not-italic text-gray-300 text-sm">
              <p>123 Chair Street</p>
              <p>Furniture District</p>
              <p>Email: info@chaircraft.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ChairCraft. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
} 