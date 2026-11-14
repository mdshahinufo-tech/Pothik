import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Palmtree, 
  Plane, 
  Building2, 
  FileCheck, 
  Users, 
  ShoppingBag, 
  FileText, 
  BarChart3, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Edit3, 
  Trash2, 
  DollarSign, 
  ShieldCheck,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Rocket
} from 'lucide-react';
import { 
  POPULAR_DESTINATIONS, 
  TOUR_PACKAGES, 
  INITIAL_ENQUIRIES, 
  VISA_GUIDES, 
  HOTELS_DATA 
} from '../../data/pothikData';
import { EnquirySubmission, Destination, TourPackage } from '../../types/pothik';
import { DeployLaunchCenter } from './DeployLaunchCenter';

interface AdminDashboardProps {
  lang: 'en' | 'bn';
  onExit: () => void;
  enquiries: EnquirySubmission[];
  onUpdateEnquiries: (enquiries: EnquirySubmission[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  onExit,
  enquiries,
  onUpdateEnquiries,
}) => {
  const [activeModule, setActiveModule] = useState<
    'overview' | 'destinations' | 'packages' | 'enquiries' | 'visa' | 'customers' | 'reports' | 'deploy'
  >('overview');

  const [adminRole, setAdminRole] = useState<'Super Admin' | 'Manager' | 'Travel Agent'>('Super Admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Enquiries stats
  const totalEnquiries = enquiries.length;
  const confirmedBookings = enquiries.filter((e) => e.status === 'Confirmed').length;
  const pendingEnquiries = enquiries.filter((e) => e.status === 'Pending').length;
  const quotedEnquiries = enquiries.filter((e) => e.status === 'Quoted').length;
  const totalRevenue = enquiries
    .filter((e) => e.status === 'Confirmed')
    .reduce((acc, curr) => acc + (curr.totalQuotedPrice || 0), 0);

  const handleUpdateStatus = (id: string, newStatus: any) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    onUpdateEnquiries(updated);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = 
      e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-[#25332D]">
      
      {/* Admin Top Bar */}
      <div className="bg-[#176B52] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E6B94F] text-[#25332D] flex items-center justify-center font-extrabold text-xs">
            P
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight font-heading block">
              POTHIK Admin Console
            </span>
            <span className="text-[10px] text-emerald-200">
              Role: <span className="font-bold text-[#E6B94F]">{adminRole}</span> · Production Ops
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={adminRole}
            onChange={(e) => setAdminRole(e.target.value as any)}
            className="text-xs bg-white/10 text-white rounded-lg px-2.5 py-1 outline-none border border-white/20"
          >
            <option value="Super Admin" className="text-slate-900">Super Admin</option>
            <option value="Manager" className="text-slate-900">Manager</option>
            <option value="Travel Agent" className="text-slate-900">Travel Agent</option>
          </select>

          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
          >
            Exit to Public Site
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-3xl p-4 border border-slate-200 shadow-xs shrink-0 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
            Operations
          </span>

          {[
            { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
            { id: 'enquiries', label: 'Booking & Enquiries', icon: ShoppingBag, badge: pendingEnquiries },
            { id: 'destinations', label: 'Destinations', icon: MapPin },
            { id: 'packages', label: 'Tour Packages', icon: Palmtree },
            { id: 'visa', label: 'Visa Tracking', icon: FileCheck },
            { id: 'customers', label: 'Customer Directory', icon: Users },
            { id: 'reports', label: 'Revenue & Reports', icon: BarChart3 },
            { id: 'deploy', label: 'Deploy & Mobile App', icon: Rocket },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#176B52] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[10px] bg-[#E6B94F] text-[#25332D] font-extrabold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </aside>

        {/* Dynamic Module Content */}
        <main className="flex-grow space-y-6">
          
          {/* OVERVIEW MODULE */}
          {activeModule === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-semibold block">Total Enquiries</span>
                  <span className="text-3xl font-extrabold text-[#25332D] font-heading">{totalEnquiries}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">Active pipeline</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-semibold block">Confirmed Bookings</span>
                  <span className="text-3xl font-extrabold text-emerald-700 font-heading">{confirmedBookings}</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Vouchers & PNRs issued</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-semibold block">Pending Follow-up</span>
                  <span className="text-3xl font-extrabold text-amber-600 font-heading">{pendingEnquiries}</span>
                  <span className="text-[10px] text-amber-700 font-bold block">Awaiting response</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-semibold block">Quoted Revenue</span>
                  <span className="text-2xl font-extrabold text-[#176B52] font-heading">
                    ৳{totalRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold block">Verified transactions</span>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#25332D] font-heading">Recent Booking Enquiries</h3>
                    <span className="text-xs text-slate-400">Live feed from customer bookings</span>
                  </div>
                  <button
                    onClick={() => setActiveModule('enquiries')}
                    className="text-xs font-bold text-[#176B52] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F6F1E6] text-slate-700 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3 rounded-l-xl">Reference</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Service & Dest</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-r-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-[#176B52]">{enq.referenceNumber}</td>
                          <td className="p-3 font-semibold text-slate-800">{enq.fullName}</td>
                          <td className="p-3">
                            <span className="font-medium text-slate-700">{enq.serviceType}</span>
                            <span className="text-slate-400 block text-[10px]">{enq.destination}</span>
                          </td>
                          <td className="p-3 text-slate-500">{enq.departureDate}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              enq.status === 'Confirmed' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : enq.status === 'Pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {enq.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                              className="text-[10px] border border-slate-200 rounded px-1.5 py-0.5 bg-white outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ENQUIRIES MODULE */}
          {activeModule === 'enquiries' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                    Booking & Customer Enquiries
                  </h3>
                  <span className="text-xs text-slate-400">Manage client requests, update statuses, assign agents</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ref or customer..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-2xl border border-slate-200 hover:border-[#176B52] transition space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#176B52] bg-[#F6F1E6] px-2 py-0.5 rounded">
                          {enq.referenceNumber}
                        </span>
                        <span className="font-bold text-sm text-slate-900">{enq.fullName}</span>
                        <span className="text-xs text-slate-400">({enq.phone})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          enq.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {enq.status}
                        </span>
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Service:</span>
                        <span>{enq.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Destination:</span>
                        <span>{enq.destination}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Date & Travelers:</span>
                        <span>{enq.departureDate} ({enq.travelers} Pax)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Quoted Value:</span>
                        <span className="font-bold text-[#176B52]">৳{(enq.totalQuotedPrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {enq.additionalRequirements && (
                      <p className="text-xs text-slate-500 italic">
                        "{enq.additionalRequirements}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESTINATIONS MODULE */}
          {activeModule === 'destinations' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                  Destination Management ({POPULAR_DESTINATIONS.length} Active)
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl font-bold border border-emerald-200">
                  Full Catalog Synced
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {POPULAR_DESTINATIONS.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl border border-slate-200 flex gap-3 items-center">
                    <img src={d.image} alt={d.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{d.name} ({d.nameBn})</h4>
                      <span className="text-xs text-slate-400 block">{d.country} · {d.type}</span>
                      <span className="text-xs font-bold text-[#176B52]">Starting BDT ৳{d.startingPriceBDT}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOUR PACKAGES MODULE */}
          {activeModule === 'packages' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                  Package Inventory & Pricing ({TOUR_PACKAGES.length} Live)
                </h3>
              </div>

              <div className="space-y-3">
                {TOUR_PACKAGES.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
                        <span className="text-xs text-slate-400">{p.destinationName} · {p.duration} · {p.type}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-[#176B52] block font-heading">
                        ৳{p.priceBDT.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Active for Booking</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISA MODULE */}
          {activeModule === 'visa' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                Visa Applications & Directory ({VISA_GUIDES.length} Countries)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VISA_GUIDES.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{v.flag}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{v.country}</h4>
                        <span className="text-xs text-slate-400">{v.visaType}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 pt-1 border-t border-slate-100 flex justify-between">
                      <span>Fee: ৳{v.feeBDT}</span>
                      <span className="font-semibold">{v.processingTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMERS MODULE */}
          {activeModule === 'customers' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                Customer Directory
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F1E6] text-slate-700 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Total Enquiries</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{c.fullName}</td>
                        <td className="p-3 text-slate-600">{c.email}</td>
                        <td className="p-3 text-slate-600">{c.phone}</td>
                        <td className="p-3 font-mono font-bold text-[#176B52]">1</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS MODULE */}
          {activeModule === 'reports' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-lg text-[#25332D] font-heading">
                Financial & Performance Reports
              </h3>
              <div className="p-4 rounded-2xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-2">
                <span className="text-xs font-bold text-[#176B52] uppercase">Revenue Overview</span>
                <div className="text-3xl font-extrabold font-heading text-[#25332D]">
                  ৳{totalRevenue.toLocaleString('en-IN')} BDT
                </div>
                <p className="text-xs text-slate-600">
                  Total booking settlements recorded from verified customer reservations.
                </p>
              </div>
            </div>
          )}

          {/* DEPLOY & MOBILE APP LAUNCH CENTER */}
          {activeModule === 'deploy' && <DeployLaunchCenter lang={lang} />}

        </main>

      </div>

    </div>
  );
};
