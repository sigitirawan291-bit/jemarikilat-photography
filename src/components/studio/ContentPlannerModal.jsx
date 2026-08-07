import React, { useState, useEffect } from 'react';
import { X, Share2, Calendar, Clock, Hash, Image, Video, Sparkles, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ContentPlannerModal({ isOpen, onClose, post = null }) {
  const { addSocialPost, updateSocialPost, hashtagGroups = [] } = useData();

  const [formData, setFormData] = useState({
    title: '',
    platform: 'Instagram',
    postType: 'Reel / Short Video',
    status: 'Idea',
    scheduledDate: '',
    scheduledTime: '18:00',
    caption: '',
    hashtagGroupId: '',
    hashtags: '',
    mediaUrl: '',
    assignedCreator: 'Sigit Irawan'
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        platform: post.platform || 'Instagram',
        postType: post.postType || 'Reel / Short Video',
        status: post.status || 'Idea',
        scheduledDate: post.scheduledDate || '',
        scheduledTime: post.scheduledTime || '18:00',
        caption: post.caption || '',
        hashtagGroupId: post.hashtagGroupId || '',
        hashtags: post.hashtags || '',
        mediaUrl: post.mediaUrl || '',
        assignedCreator: post.assignedCreator || 'Sigit Irawan'
      });
    } else {
      setFormData({
        title: '',
        platform: 'Instagram',
        postType: 'Reel / Short Video',
        status: 'Idea',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '18:00',
        caption: '',
        hashtagGroupId: '',
        hashtags: '#JemariKilat #FotograferMedan #WeddingMedan',
        mediaUrl: '',
        assignedCreator: 'Sigit Irawan'
      });
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.scheduledDate) {
      alert('Judul Konten dan Tanggal Jadwal wajib diisi!');
      return;
    }

    if (post) {
      updateSocialPost(post.id, formData);
    } else {
      addSocialPost(formData);
    }
    onClose();
  };

  const handleSelectHashtagGroup = (groupId) => {
    const selected = hashtagGroups.find(h => h.id === groupId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        hashtagGroupId: groupId,
        hashtags: prev.hashtags ? `${prev.hashtags} ${selected.hashtags}` : selected.hashtags
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-on-surface p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
              Digital Marketing & Social Media Content
            </span>
            <h2 className="text-2xl font-serif font-bold text-on-surface">
              {post ? 'Edit Postingan Content' : 'Buat Planner Postingan Baru'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Judul / Konsep Konten *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Behind The Scenes Wedding Ananda & Rizky"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Platform Target</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-bold text-primary"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Facebook">Facebook Page</option>
              </select>
            </div>
          </div>

          {/* Post Type & Status & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Format Konten</label>
              <select
                value={formData.postType}
                onChange={(e) => setFormData({ ...formData, postType: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="Reel / Short Video">Reel / Video Pendek</option>
                <option value="Carousel Photo">Carousel Foto (Swipe)</option>
                <option value="Single Feed">Single Feed Photo</option>
                <option value="Story">Instagram / FB Story</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Status Pipeline</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-bold text-amber-400"
              >
                <option value="Idea">1. Idea / Hook Concept</option>
                <option value="Drafting">2. Drafting Caption</option>
                <option value="Assets Ready">3. Media Assets Ready</option>
                <option value="Scheduled">4. Scheduled (Siap Posting)</option>
                <option value="Published">5. Published (Sudah Tayang)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Kreator / Designer</label>
              <input
                type="text"
                value={formData.assignedCreator}
                onChange={(e) => setFormData({ ...formData, assignedCreator: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Tanggal Rencana Posting *</label>
              <input
                type="date"
                required
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-on-surface-variant font-medium mb-1">Jam Posting (Prime Time)</label>
              <input
                type="text"
                placeholder="18:00"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Caption & Hashtags */}
          <div>
            <label className="block text-xs text-on-surface-variant font-medium mb-1">Draft Caption Sosmed</label>
            <textarea
              rows={4}
              placeholder="Tulis caption menarik, ajakan hook, CTA (Call to action), link in bio..."
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-sm focus:outline-none focus:border-primary font-sans leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                <Hash size={14} /> Hashtags Tagging
              </label>
              {hashtagGroups.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-on-surface-variant">Sisipkan Preset:</span>
                  {hashtagGroups.map(h => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => handleSelectHashtagGroup(h.id)}
                      className="px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 rounded text-[10px] font-bold"
                    >
                      + {h.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <textarea
              rows={2}
              placeholder="#WeddingMedan #FotograferMedan #JemariKilat"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-mono focus:outline-none focus:border-primary"
            />
          </div>

          {/* Media URL / Thumbnail */}
          <div>
            <label className="block text-xs text-on-surface-variant font-medium mb-1">URL Cover Media / Thumbnail Asset Link</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... atau link cloud asset"
              value={formData.mediaUrl}
              onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/40 rounded-lg text-xs font-mono focus:outline-none focus:border-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
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
              {post ? 'Simpan Perubahan' : 'Jadwalkan Postingan'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
