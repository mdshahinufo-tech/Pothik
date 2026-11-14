import React from 'react';
import { ShieldCheck, FileText, RefreshCw, ArrowLeft } from 'lucide-react';
import { PageView } from '../../types/pothik';
import { BRAND } from '../../data/pothikData';

interface PolicyPagesProps {
  page: 'privacy' | 'terms' | 'refund';
  lang: 'en' | 'bn';
  onNavigate: (page: PageView) => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({
  page,
  lang,
  onNavigate,
}) => {
  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-[#25332D]">
      
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
      </button>

      {/* PRIVACY POLICY */}
      {page === 'privacy' && (
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
                {lang === 'bn' ? 'গোপনীয়তা নীতিমালা (Privacy Policy)' : 'Privacy Policy'}
              </h1>
              <span className="text-xs text-slate-400">Last updated: January 2025</span>
            </div>
          </div>

          <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            <p>
              At <strong>POTHIK (পথিক)</strong>, accessible from pothik.com.bd, the privacy of our visitors and clients is one of our main priorities. This document details the types of personal information collected and recorded by POTHIK and how we use it.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">1. Information We Collect</h3>
            <p>
              When you book tickets, tour packages, or apply for visa assistance, we may request details including:
              Full name, email address, phone/WhatsApp number, National ID or Passport details (required for BIWTA Saint Martin QR travel pass issuance and airline PNR generation), and payment transaction references.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To issue guaranteed vessel e-tickets and government QR travel passes.</li>
              <li>To verify resort bookings and coordinate airport transfers.</li>
              <li>To process official visa applications with sovereign diplomatic missions.</li>
              <li>To communicate flight rescheduling or weather advisory notices.</li>
            </ul>
            <h3 className="text-base font-bold text-[#25332D] font-heading">3. Data Protection</h3>
            <p>
              We implement industry-standard encryption and access controls. We never sell, lease, or rent customer personal information to third-party marketers.
            </p>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS */}
      {page === 'terms' && (
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
                {lang === 'bn' ? 'শর্তাবলী ও নিয়মাবলী (Terms & Conditions)' : 'Terms & Conditions'}
              </h1>
              <span className="text-xs text-slate-400">Last updated: January 2025</span>
            </div>
          </div>

          <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            <p>
              By accessing POTHIK and engaging our services, you agree to comply with the following contractual terms and regulations governed by the laws of Bangladesh.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">1. Booking Confirmation & PNR</h3>
            <p>
              A booking is deemed confirmed only after advance payment is received and an official POTHIK Booking Reference (e.g., PK-2025-XXXX) or digital voucher is generated.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">2. Saint Martin Marine Regulations</h3>
            <p>
              Travel to Saint Martin's Island requires all passengers to carry a valid government-approved digital QR Travel Pass. Passengers must arrive at Cox's Bazar Nunia Chhara BIWTA Jetty at least 45 minutes prior to vessel departure. Single-use plastics and damage to live coral reefs are strictly prohibited by environmental law.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">3. Visa Services Limitation</h3>
            <p>
              POTHIK acts solely as a documentation facilitator. The decision to grant or refuse a visa rests exclusively with the respective embassy or consulate. Visa application fees are non-refundable regardless of outcome.
            </p>
          </div>
        </div>
      )}

      {/* CANCELLATION & REFUND POLICY */}
      {page === 'refund' && (
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading">
                {lang === 'bn' ? 'বাতিল ও রিফান্ড নীতি (Refund Policy)' : 'Cancellation & Refund Policy'}
              </h1>
              <span className="text-xs text-slate-400">Last updated: January 2025</span>
            </div>
          </div>

          <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            <p>
              POTHIK is committed to fair, transparent refund mechanisms for our travelers.
            </p>
            <h3 className="text-base font-bold text-[#25332D] font-heading">1. Customer-Initiated Cancellations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-[#F6F1E6] text-[#25332D]">
                  <tr>
                    <th className="p-3 border">Cancellation Timeline</th>
                    <th className="p-3 border">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">7 or more days prior to departure</td>
                    <td className="p-3 border font-bold text-emerald-700">90% of refundable package amount</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">3 to 6 days prior to departure</td>
                    <td className="p-3 border font-bold text-amber-700">50% of refundable package amount</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Less than 72 hours / No Show</td>
                    <td className="p-3 border font-bold text-rose-700">Non-refundable (0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-bold text-[#25332D] font-heading">2. Weather Disruption & Port Authority Shutdowns</h3>
            <p>
              In the event that vessel sailings to Saint Martin Island or domestic flights are cancelled due to maritime cyclone signals (Signal 3 or higher) or BIWTA executive safety directives, customers receive:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Option A: 100% free date rescheduling within the same operating season.</li>
              <li>Option B: Full refund of ship fare less direct banking processing surcharges.</li>
            </ul>

            <h3 className="text-base font-bold text-[#25332D] font-heading">3. Refund Processing Window</h3>
            <p>
              Approved refunds are disbursed to the original payment method (bKash, Nagad, or Bank Account) within 5 to 7 business working days.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
