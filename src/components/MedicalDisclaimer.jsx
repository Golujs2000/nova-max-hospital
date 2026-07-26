import { FiShield, FiInfo } from 'react-icons/fi'
import { siteData } from '../data/siteData'

export default function MedicalDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-500 flex items-start gap-3 my-6">
        <FiInfo className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-slate-700">Medical & Google Ads Policy Notice: </strong>
          The information provided on this page is for educational and general informational purposes only. It is not intended as personal medical advice or diagnostic evaluation. Individual surgical outcomes and recovery timelines may vary. Consult a qualified medical specialist at Nova Max Hospital for personalized diagnosis and treatment planning.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 via-primary-50/20 to-slate-50 border border-slate-200 rounded-2xl p-6 my-10 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-100/80 text-primary-700 flex items-center justify-center shrink-0">
          <FiShield className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            Medical Disclaimer & Ethical Care Disclosure
            <span className="text-[11px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Google Ads Compliant
            </span>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nova Max Hospital adheres strictly to ethical medical advertising guidelines. All medical treatment, surgery, and doctor credentials listed are thoroughly verified by certified specialists. Surgical options, risk assessments, and recovery expectations are evaluated on a patient-by-patient basis during initial clinical consultation. Emergency services are available 24×7.
          </p>
          <div className="text-[11px] text-slate-400 pt-1">
            Emergency Care Hotline: <a href={`tel:${siteData.contact.phone}`} className="text-primary-600 font-semibold hover:underline">{siteData.contact.phone}</a> / <a href={`tel:${siteData.contact.phone2}`} className="text-primary-600 font-semibold hover:underline">{siteData.contact.phone2}</a> | Location: Nova Max Hospital, Digha, Patna, Bihar
          </div>
        </div>
      </div>
    </div>
  )
}
