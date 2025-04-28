"use client";

import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const whatsappNumbers = [
    "+212624828155", // First number
    // Add more numbers here as needed
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage') || 'Hi, I would like to know more about your products.');
    
    // If there's only one number, open directly
    if (whatsappNumbers.length === 1) {
      const whatsappUrl = `https://wa.me/${whatsappNumbers[0]}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    // If multiple numbers, create a list of links
    const numberList = whatsappNumbers.map(number => {
      const whatsappUrl = `https://wa.me/${number}?text=${message}`;
      return `<a href="${whatsappUrl}" target="_blank">${number}</a>`;
    }).join('<br>');

    // Create and show a modal with the list of numbers
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
      <h3 style="margin-bottom: 15px;">${t('whatsapp.selectNumber') || 'Select a number to contact'}</h3>
      ${numberList}
      <button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 8px 16px; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer;">
        ${t('whatsapp.close') || 'Close'}
      </button>
    `;
    document.body.appendChild(modal);
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label={t('whatsapp.buttonLabel') || 'Contact us on WhatsApp'}
    >
      <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" className="w-6 h-6" />
    </button>
  );
}
