import React, { useState, useEffect } from 'react';
import { 
  X, 
  HardDrive, 
  FileText, 
  ExternalLink, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock,
  FolderOpen
} from 'lucide-react';
import { googleDriveService, DriveTripFile } from '../services/googleDriveService';
import { signInWithGoogle, auth } from '../firebase';
import { User } from 'firebase/auth';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  currentUser: User | null;
  onSignInRequest: () => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  onSignInRequest,
}) => {
  const [files, setFiles] = useState<DriveTripFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Destructive delete confirmation state
  const [confirmDeleteFile, setConfirmDeleteFile] = useState<DriveTripFile | null>(null);

  const loadFiles = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    try {
      const driveFiles = await googleDriveService.listTripFilesFromDrive();
      setFiles(driveFiles);
    } catch (err: any) {
      setError(err?.message || 'Failed to load files from Google Drive');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      loadFiles();
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleDeleteConfirmed = async () => {
    if (!confirmDeleteFile) return;
    setDeletingId(confirmDeleteFile.id);
    try {
      const success = await googleDriveService.deleteFileFromDrive(confirmDeleteFile.id);
      if (success) {
        setFiles((prev) => prev.filter((f) => f.id !== confirmDeleteFile.id));
        setConfirmDeleteFile(null);
      } else {
        throw new Error('Failed to delete file from Google Drive');
      }
    } catch (err: any) {
      setError(err?.message || 'Error deleting file');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <HardDrive className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg sm:text-xl text-white">
                  {lang === 'bn' ? 'গুগল ড্রাইভ ট্রিপ ডকুমেন্টস' : 'Google Drive Trip Documents'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-200 border border-blue-300/30">
                  Google Drive API
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'bn' 
                  ? 'আপনার সেন্টমার্টিন ট্রাভেল পাস ও টিকিট গুগল ড্রাইভে সুরক্ষিত রাখুন' 
                  : 'Manage and access your Saint Martin trip passes in your Google Drive'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Sign in gate if not logged in */}
          {!currentUser ? (
            <div className="text-center py-10 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="font-bold text-slate-900 text-lg">
                  {lang === 'bn' ? 'গুগল অ্যাকাউন্ট দিয়ে সাইন ইন করুন' : 'Sign in to access Google Drive'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার অনুমোদনের মাধ্যমে সেন্টমার্টিনের নিশ্চিত কিউআর পাস সরাসরি আপনার নিজস্ব গুগল ড্রাইভের ফোল্ডারে সেভ থাকবে।'
                    : 'With your permission, Tripbooking.ai stores your authentic travel pass and ticket in your personal Google Drive.'}
                </p>
              </div>

              <button
                onClick={onSignInRequest}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {/* Official Google G Logo */}
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{lang === 'bn' ? 'Google দিয়ে সাইন ইন করুন' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* User Account Strip */}
              <div className="flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="User" className="w-8 h-8 rounded-full border border-blue-300" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {currentUser.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-slate-900 block">{currentUser.displayName || 'Google User'}</span>
                    <span className="text-[11px] text-slate-500">{currentUser.email}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full block">
                    ✓ Google Drive Connected
                  </span>
                  <span className="text-[10px] text-slate-500">Folder: Tripbooking.ai</span>
                </div>
              </div>

              {/* Error alert */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Files List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'bn' ? 'ড্রাইভে সংরক্ষিত ট্রিপ ফাইলসমূহ:' : 'Passes Saved in Google Drive:'}
                  </h4>
                  <button
                    onClick={loadFiles}
                    disabled={loading}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {loading ? 'Refreshing...' : (lang === 'bn' ? 'রিফ্রেশ' : 'Refresh')}
                  </button>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                    <span className="text-xs font-medium">Loading Google Drive documents...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl p-6 space-y-2">
                    <HardDrive className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-600 font-semibold">
                      {lang === 'bn' ? 'এখনো কোনো ট্রাভেল পাস ড্রাইভে সেভ করা হয়নি।' : 'No travel passes saved in Google Drive yet.'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'bn' 
                        ? 'বুকিং সম্পন্ন করে "Save to Google Drive" এ ক্লিক করুন।' 
                        : 'Book your Saint Martin trip and click "Save to Google Drive" on the confirmation pass.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white shadow-xs flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-slate-900 block truncate">{file.name}</span>
                            <span className="text-[10px] text-slate-400">
                              {file.createdTime ? new Date(file.createdTime).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 transition"
                            >
                              <span>{lang === 'bn' ? 'ড্রাইভে দেখুন' : 'Open in Drive'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <button
                            onClick={() => setConfirmDeleteFile(file)}
                            disabled={deletingId === file.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title={lang === 'bn' ? 'ড্রাইভ থেকে মুছুন' : 'Delete from Drive'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? 'গুগল ড্রাইভ প্রাইভেসি ও এনক্রিপশন সংরক্ষিত' : 'Google Drive Workspace Security Guaranteed'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>

      {/* Mandatory User Confirmation Dialog for Destructive Delete (workspace-integration) */}
      {confirmDeleteFile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'bn' ? 'ড্রাইভ থেকে ফাইল মুছবেন?' : 'Delete File from Google Drive?'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? `আপনি কি নিশ্চিতভাবে "${confirmDeleteFile.name}" ফাইলটি আপনার গুগল ড্রাইভ থেকে মুছে ফেলতে চান? এই কাজটি বাতিল করা যাবে না।`
                  : `Are you sure you want to permanently delete "${confirmDeleteFile.name}" from your Google Drive? This action cannot be undone.`}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteFile(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
