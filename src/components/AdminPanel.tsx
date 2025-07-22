import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function AdminPanel() {
  const isExecutive = useQuery(api.userProfiles.checkIsExecutive);
  const [activeTab, setActiveTab] = useState<"certificates" | "events" | "magazines" | "gallery">("certificates");

  if (!isExecutive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-luxury">
        <div className="luxury-card p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-gold rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-secondary-900 mb-4">Access Restricted</h2>
          <p className="text-secondary-600">This area is reserved for EEA executives only.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "certificates", label: "Certificate Requests", icon: "📜" },
    { id: "events", label: "Event Management", icon: "📅" },
    { id: "magazines", label: "Magazine Publishing", icon: "📖" },
    { id: "gallery", label: "Gallery Management", icon: "🖼️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream to-accent">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-display font-bold text-secondary-900 mb-4">
            Executive <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Manage EEA operations with executive privileges
          </p>
          <div className="executive-badge mt-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.734.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.723V12a1 1 0 11-2 0v-1.277l-1.246-.855a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.277l1.246.855a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
            </svg>
            Executive Access
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 animate-slide-up">
          <div className="luxury-card p-2 inline-flex rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-gold text-white shadow-gold"
                    : "text-secondary-600 hover:text-secondary-900 hover:bg-primary-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "certificates" && <CertificateManagement />}
          {activeTab === "events" && <EventManagement />}
          {activeTab === "magazines" && <MagazineManagement />}
          {activeTab === "gallery" && <GalleryManagement />}
        </div>
      </div>
    </div>
  );
}

function CertificateManagement() {
  const pendingCertificates = useQuery(api.certificates.listPending);
  const updateStatus = useMutation(api.certificates.updateStatus);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  const handleStatusUpdate = async (certificateId: string, status: "approved" | "rejected") => {
    try {
      await updateStatus({
        certificateId: certificateId as any,
        status,
        reviewNotes: reviewNotes[certificateId] || undefined,
      });
      toast.success(`Certificate ${status} successfully`);
      setReviewNotes(prev => ({ ...prev, [certificateId]: "" }));
    } catch (error) {
      toast.error(`Failed to ${status} certificate`);
    }
  };

  return (
    <div className="luxury-card p-8">
      <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6 flex items-center">
        <span className="text-3xl mr-3">📜</span>
        Certificate Requests
      </h2>

      {pendingCertificates === undefined ? (
        <div className="flex justify-center py-12">
          <div className="loading-shimmer w-8 h-8 rounded-full"></div>
        </div>
      ) : pendingCertificates.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-secondary-600 text-lg">No pending certificate requests</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingCertificates.map((cert) => (
            <div key={cert._id} className="bg-accent-pearl rounded-xl p-6 hover-glow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-display font-semibold text-secondary-900 mb-2">
                    {cert.eventTitle}
                  </h3>
                  <div className="space-y-2 text-secondary-600">
                    <p><span className="font-semibold">Student:</span> {cert.studentName}</p>
                    <p><span className="font-semibold">Email:</span> {cert.studentEmail}</p>
                    <p><span className="font-semibold">ID:</span> {cert.studentId}</p>
                    <p><span className="font-semibold">Event Date:</span> {cert.eventDate}</p>
                    <p><span className="font-semibold">Type:</span> {cert.certificateType}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Review Notes (Optional)
                    </label>
                    <textarea
                      value={reviewNotes[cert._id] || ""}
                      onChange={(e) => setReviewNotes(prev => ({ ...prev, [cert._id]: e.target.value }))}
                      className="premium-input h-24 resize-none"
                      placeholder="Add any notes about this request..."
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStatusUpdate(cert._id, "approved")}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(cert._id, "rejected")}
                      className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventManagement() {
  const createEvent = useMutation(api.events.create);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "workshop" as "workshop" | "seminar" | "competition" | "meeting",
  });

  const handleImageUpload = async (file: File) => {
    if (!file) return null;

    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) throw new Error("Upload failed");
    const { storageId } = await result.json();
    return storageId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const fileInput = document.getElementById("event-image") as HTMLInputElement;
      const file = fileInput?.files?.[0];
      
      let imageId = undefined;
      if (file) {
        imageId = await handleImageUpload(file);
      }

      await createEvent({
        ...formData,
        imageId,
      });

      toast.success("Event created successfully!");
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "workshop",
      });
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="luxury-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-display font-bold text-secondary-900 flex items-center">
          <span className="text-3xl mr-3">📅</span>
          Event Management
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="luxury-button"
        >
          ✨ Create New Event
        </button>
      </div>

      {showForm && (
        <div className="modal-backdrop flex items-center justify-center p-4">
          <div className="luxury-card max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold text-secondary-900">Create New Event</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-secondary-400 hover:text-secondary-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="premium-input"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="premium-input"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="competition">Competition</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="premium-input h-32 resize-none"
                  placeholder="Describe the event..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="premium-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="premium-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="premium-input"
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Event Image (Optional)
                </label>
                <input
                  id="event-image"
                  type="file"
                  accept="image/*"
                  className="premium-input"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="luxury-button flex-1 disabled:opacity-50"
                >
                  {uploading ? "Creating..." : "✨ Create Event"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-secondary-200 text-secondary-700 px-8 py-4 rounded-xl font-semibold hover:bg-secondary-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-center py-12">
        <p className="text-secondary-600">Event management interface ready for executive use.</p>
      </div>
    </div>
  );
}

function MagazineManagement() {
  const createMagazine = useMutation(api.magazines.create);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issue: "",
    publishDate: "",
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return null;

    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) throw new Error("Upload failed");
    const { storageId } = await result.json();
    return storageId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const coverInput = document.getElementById("cover-image") as HTMLInputElement;
      const pdfInput = document.getElementById("pdf-file") as HTMLInputElement;
      
      const coverFile = coverInput?.files?.[0];
      const pdfFile = pdfInput?.files?.[0];
      
      let coverImageId = undefined;
      let pdfId = undefined;
      
      if (coverFile) {
        coverImageId = await handleFileUpload(coverFile);
      }
      
      if (pdfFile) {
        pdfId = await handleFileUpload(pdfFile);
      }

      await createMagazine({
        ...formData,
        coverImageId,
        pdfId,
      });

      toast.success("Magazine published successfully!");
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        issue: "",
        publishDate: "",
      });
    } catch (error) {
      toast.error("Failed to publish magazine");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="luxury-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-display font-bold text-secondary-900 flex items-center">
          <span className="text-3xl mr-3">📖</span>
          Magazine Publishing
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="luxury-button"
        >
          📚 Publish New Issue
        </button>
      </div>

      {showForm && (
        <div className="modal-backdrop flex items-center justify-center p-4">
          <div className="luxury-card max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold text-secondary-900">Publish New Magazine</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-secondary-400 hover:text-secondary-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Magazine Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="premium-input"
                    placeholder="Enter magazine title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Issue Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="premium-input"
                    placeholder="e.g., Vol 1 Issue 2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="premium-input h-32 resize-none"
                  placeholder="Describe this magazine issue..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="premium-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Cover Image
                  </label>
                  <input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="premium-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    PDF File
                  </label>
                  <input
                    id="pdf-file"
                    type="file"
                    accept=".pdf"
                    className="premium-input"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="luxury-button flex-1 disabled:opacity-50"
                >
                  {uploading ? "Publishing..." : "📚 Publish Magazine"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-secondary-200 text-secondary-700 px-8 py-4 rounded-xl font-semibold hover:bg-secondary-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-center py-12">
        <p className="text-secondary-600">Magazine publishing interface ready for executive use.</p>
      </div>
    </div>
  );
}

function GalleryManagement() {
  return (
    <div className="luxury-card p-8">
      <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6 flex items-center">
        <span className="text-3xl mr-3">🖼️</span>
        Gallery Management
      </h2>
      <div className="text-center py-12">
        <p className="text-secondary-600">Gallery management interface ready for executive use.</p>
        <p className="text-secondary-500 mt-2">Upload and organize event photos here.</p>
      </div>
    </div>
  );
}
