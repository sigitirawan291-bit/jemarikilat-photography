import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, MapPin, DollarSign, Folder, Link as LinkIcon, Printer, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProjectModal({ isOpen, onClose, project = null }) {
  const { addProject, updateProject, deleteProject, photographers = [] } = useData();

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    eventType: 'Wedding Photography & Film',
    packageName: 'Royal Platinum Wedding',
    eventDate: '',
    eventTime: '08:00 WIB',
    location: '',
    status: 'Booking / Prospect',
    totalAmount: 5000000,
    paidAmount: 2000000,
    paymentStatus: 'DP Paid',
    assignedCrew: [],
    rawDriveUrl: '',
    finalDriveUrl: '',
    notes: ''
  });

  const [crewSelection, setCrewSelection] = useState({ fgId: '', role: 'Photographer', fee: 1000000 });

  useEffect(() => {
    if (project) {
      setFormData({
        clientName: project.clientName || '',
        clientPhone: project.clientPhone || '',
        clientEmail: project.clientEmail || '',
        eventType: project.eventType || 'Wedding Photography',
        packageName: project.packageName || '',
        eventDate: project.eventDate || '',
        eventTime: project.eventTime || '08:00 WIB',
        location: project.location || '',
        status: project.status || 'Booking / Prospect',
        totalAmount: project.totalAmount || 0,
        paidAmount: project.paidAmount || 0,
        paymentStatus: project.paymentStatus || 'Unpaid',
        assignedCrew: project.assignedCrew || [],
        rawDriveUrl: project.rawDriveUrl || '',
        finalDriveUrl: project.finalDriveUrl || '',
        notes: project.notes || ''
      });
    } else {
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        eventType: 'Wedding Photography',
        packageName: '',
        eventDate: new Date().toISOString().split('T')[0],
        eventTime: '09:00 WIB',
        location: '',
        status: 'Booking / Prospect',
        totalAmount: 5000000,
        paidAmount: 2000000,
        paymentStatus: 'DP Paid',
        assignedCrew: [],
        rawDriveUrl: '',
        finalDriveUrl: '',
        notes: ''
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.eventDate) {
      alert('Nama Klien dan Tanggal Event wajib diisi!');
      return;
    }

    if (project) {
      updateProject(project.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  const handleAddCrew = () => {
    if (!crewSelection.fgId) return;
    const selectedFg = photographers.find(f => f.id === crewSelection.fgId);
    if (!selectedFg) return;

    const alreadyAssigned = formData.assignedCrew.some(c => c.id === selectedFg.id);
    if (alreadyAssigned) {
      alert('Crew ini sudah ditugaskan pada project ini.');
      return;
    }

    const newCrewList = [
      ...formData.assignedCrew,
      {
        id: selectedFg.id,
        name: selectedFg.name,
        role: crewSelection.role,
        fee: Number(crewSelection.fee) || 0,
        payoutStatus: 'Unpaid'
      }
    ];

    setFormData({ ...formData, assignedCrew: newCrewList });
    setCrewSelection({ fgId: '', role: 'Photographer', fee: 1000000 });
  };

  const handleRemoveCrew = (fgId) => {
    const updated = formData.assignedCrew.filter(c => c.id !== fgId);
    setFormData({ ...formData, assignedCrew: updated });
  };

  const handlePrintBrief = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Project Brief - ${formData.clientName} (${formData.eventDate})</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #111; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; color: #b89758; text-transform: uppercase; font-size: 24px; }
            .section { margin-bottom: 20px; }
            .section h3 { background: #f0f0f0; padding: 6px 10px; border-left: 4px solid #b89758; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
            th { background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>JEMARI KILAT PHOTOGRAPHY</h1>
            <p>PROJECT JOB BRIEF & CLIENT DOCUMENTATION</p>
          </div>
          <div class="section">
            <h3>Informasi Klien</h3>
            <p><strong>Nama Klien:</strong> ${formData.clientName}</p>
            <p><strong>Telepon / WhatsApp:</strong> ${formData.clientPhone}</p>
            <p><strong>Email:</strong> ${formData.clientEmail || '-'}</p>
          </div>
          <div class="section">
            <h3>Detail Acara & Sesi Foto</h3>
            <p><strong>Jenis Event:</strong> ${formData.eventType}</p>
            <p><strong>Paket:</strong> ${formData.packageName}</p>
            <p><strong>Tanggal & Waktu:</strong> ${formData.eventDate} (${formData.eventTime})</p>
            <p><strong>Lokasi:</strong> ${formData.location}</p>
          </div>
          <div class="section">
            <h3>Tim Crew Bertugas</h3>
            <table>
              <thead>
                <tr><th>Nama Member</th><th>Peran / Role</th><th>Status Fee</th></tr>
              </thead>
              <tbody>
                ${formData.assignedCrew.map(c => `<tr><td>${c.name}</td><td>${c.role}</td><td>${c.payoutStatus}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="section">
            <h3>Catatan Khusus & Request Klien</h3>
            <p>${formData.notes || 'Tidak ada catatan khusus.'}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-on-surface p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
              {project ? `Edit Project: ${project.projectCode}` : 'Project Photography Baru'}
            </span>
            <h2 className="text-2xl font-serif font-bold text-on-surface">
              {project ? project.clientName : 'Kelola Data Project'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Client Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <User size={16} /> Informasi Klien & Kontak
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Nama Klien / Instansi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ananda & Rizky"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Telepon / WhatsApp</label>
                <input
                  type="text"
                  placeholder="0812xxxxxxxx"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Email Klien</label>
                <input
                  type="email"
                  placeholder="klien@gmail.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Event Details & Status */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Calendar size={16} /> Detail Event & Stage Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Jenis Event</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Wedding Photography & Film">Wedding Photography & Film</option>
                  <option value="Prewedding Outdoor / Indoor">Prewedding Outdoor / Indoor</option>
                  <option value="Graduation Group & Personal">Wisuda Group & Personal</option>
                  <option value="Engagement / Lamaran">Lamaran / Engagement</option>
                  <option value="Event Stage & Concert">Event Concert & Stage</option>
                  <option value="Studio Personal & Commercial">Studio & Personal Photo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Nama Paket</label>
                <input
                  type="text"
                  placeholder="Contoh: Royal Platinum Wedding"
                  value={formData.packageName}
                  onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Kanban Status Project</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm font-bold focus:outline-none focus:border-primary text-primary"
                >
                  <option value="Booking / Prospect">1. Booking / Prospect</option>
                  <option value="Confirmed">2. Confirmed (DP Paid)</option>
                  <option value="Pre-Shoot Prep">3. Pre-Shoot Prep</option>
                  <option value="Shooting Scheduled">4. Shooting Day / Scheduled</option>
                  <option value="Editing">5. RAW Uploaded & Editing</option>
                  <option value="Client Revision">6. Client Review / Revision</option>
                  <option value="Final Delivered">7. Final Delivered</option>
                  <option value="Completed">8. Completed & Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Tanggal Event *</label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Waktu Sesi</label>
                <input
                  type="text"
                  placeholder="08:00 WIB"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Lokasi Venue / Studio</label>
                <input
                  type="text"
                  placeholder="Lokasi event / studio"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financials */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <DollarSign size={16} /> Keuangan & Status Pembayaran
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Total Biaya (Rp)</label>
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">DP / Terbayar (Rp)</label>
                <input
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Status Pembayaran</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Unpaid">Unpaid (Belum Bayar)</option>
                  <option value="DP Paid">DP Paid (Down Payment)</option>
                  <option value="Paid Full">Paid Full (Lunas)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Team Assignment */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <User size={16} /> Penugasan Tim Crew & Fee
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 bg-surface p-3 rounded-lg border border-outline-variant/30">
              <select
                value={crewSelection.fgId}
                onChange={(e) => setCrewSelection({ ...crewSelection, fgId: e.target.value })}
                className="flex-1 px-3 py-2 bg-surface-container border border-outline-variant/40 rounded text-xs focus:outline-none"
              >
                <option value="">-- Pilih Crew --</option>
                {photographers.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.specialty})</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Peran (e.g. Lead FG / Video)"
                value={crewSelection.role}
                onChange={(e) => setCrewSelection({ ...crewSelection, role: e.target.value })}
                className="w-36 px-3 py-2 bg-surface-container border border-outline-variant/40 rounded text-xs"
              />
              <input
                type="number"
                placeholder="Fee Honorarium (Rp)"
                value={crewSelection.fee}
                onChange={(e) => setCrewSelection({ ...crewSelection, fee: e.target.value })}
                className="w-32 px-3 py-2 bg-surface-container border border-outline-variant/40 rounded text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleAddCrew}
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded hover:bg-outline transition-colors"
              >
                + Tugaskan Crew
              </button>
            </div>

            {formData.assignedCrew.length > 0 && (
              <div className="space-y-2">
                {formData.assignedCrew.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant/20 text-xs">
                    <div>
                      <span className="font-bold text-on-surface">{c.name}</span>
                      <span className="ml-2 text-on-surface-variant">({c.role})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-primary font-bold">Rp {Number(c.fee).toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${c.payoutStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {c.payoutStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCrew(c.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Drive Links & Notes */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Folder size={16} /> Cloud Album & Drive Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Link Folder RAW File (Google Drive/Dropbox)</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.rawDriveUrl}
                  onChange={(e) => setFormData({ ...formData, rawDriveUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-on-surface-variant font-medium mb-1">Link Folder Final Delivered Album</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.finalDriveUrl}
                  onChange={(e) => setFormData({ ...formData, finalDriveUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Catatan Khusus & Shooting Requirement</label>
              <textarea
                rows={3}
                placeholder="Catatan moodboard, kriteria foto, rundown acara, dll..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between pt-6 border-t border-outline-variant/20 gap-3">
            <div className="flex items-center gap-2">
              {project && (
                <button
                  type="button"
                  onClick={handlePrintBrief}
                  className="px-4 py-2 bg-surface-container border border-outline-variant/40 hover:bg-surface text-on-surface rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Printer size={14} /> Cetak Project Brief
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-on-primary hover:bg-outline rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                {project ? 'Simpan Perubahan' : 'Buat Project Baru'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
