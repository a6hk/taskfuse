import React, { useState } from 'react';
import { submitLead } from '../lib/leadService';

interface EmailCaptureFormProps {
  source: string;
  tier?: string;
  className?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
}

export function EmailCaptureForm({
  source,
  tier,
  className = '',
  autoFocus = false,
  onSuccess,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If bot filled hidden field, silently simulate success
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await submitLead({
        email,
        source,
        tier,
      });
      setStatus('success');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`p-4 rounded-[8px] border border-[#30363D] bg-[#161B22] animate-success-fade-in ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#F5A524]/20 text-[#F5A524] flex items-center justify-center shrink-0 mt-0.5 animate-checkmark-pop">
            <svg
              className="w-3 h-3 text-[#F5A524]"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-[15px] font-medium text-[#E6EDF3] leading-relaxed">
              You're on the founding list. We onboard in small weekly batches — you'll get one email with your audit setup steps (a one-line base-URL change) when your slot opens, and your one-page report seven days after that.
            </p>
            {tier && (
              <p className="text-[13px] text-[#8B949E] font-mono mt-1">
                Reserved tier: <span className="text-[#F5A524]">{tier}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Visually hidden honeypot field for bot protection */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor={`hp-${source}`}>Leave blank</label>
          <input
            id={`hp-${source}`}
            type="text"
            name="company_website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourcompany.com"
            required
            autoFocus={autoFocus}
            className="flex-1 px-4 py-3.5 rounded-[8px] bg-[#161B22] border border-[#30363D] text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#F5A524] transition-colors text-[16px]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary shrink-0 whitespace-nowrap"
          >
            {status === 'loading' ? 'Reserving spot...' : 'Get my free spend audit'}
          </button>
        </div>

        {status === 'error' && (
          <p className="text-[14px] text-red-400 mt-1">{errorMessage}</p>
        )}

        <p className="text-[14px] text-[#8B949E]">
          No spam. One email when your audit slot opens. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
