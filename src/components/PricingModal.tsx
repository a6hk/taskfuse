import React, { useEffect } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  tierPrice: string;
}

export function PricingModal({ isOpen, onClose, tierName, tierPrice }: PricingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div
        className="w-full max-w-[500px] rounded-[8px] bg-[#161B22] border border-[#30363D] p-6 sm:p-8 space-y-6 relative"
        style={{ animation: 'modalEnter 180ms ease-out' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8B949E] hover:text-[#E6EDF3] transition-colors p-1"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#0D1117] border border-[#30363D] text-[#F5A524] text-[12px] font-mono">
            RESERVING {tierName.toUpperCase()} TIER ({tierPrice})
          </div>
          <h3 className="text-[24px] font-bold text-[#E6EDF3]" style={{ fontFamily: 'var(--font-heading)' }}>
            Lock in founding {tierName} pricing
          </h3>
          <p className="text-[15px] text-[#8B949E] leading-relaxed">
            Founding users get priority onboarding and a free 7-day Agent Spend Audit of one workflow at launch before any billing begins.
          </p>
        </div>

        <EmailCaptureForm
          source={`pricing-${tierName.toLowerCase()}`}
          tier={tierName}
          autoFocus={true}
        />
      </div>
    </div>
  );
}
