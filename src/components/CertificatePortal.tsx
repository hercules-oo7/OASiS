import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function CertificatePortal() {
  const myRequests = useQuery(api.certificates.listMyRequests);
  const requestCertificate = useMutation(api.certificates.request);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentId: "",
    eventTitle: "",
    eventDate: "",
    certificateType: "participation" as "participation" | "completion" | "achievement",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestCertificate(formData);
      toast.success("Certificate request submitted successfully!");
      setShowForm(false);
      setFormData({
        studentName: "",
        studentEmail: "",
        studentId: "",
        eventTitle: "",
        eventDate: "",
        certificateType: "participation",
      });
    } catch (error) {
      toast.error("Failed to submit certificate request");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-50 text-green-800 border-green-200";
      case "rejected": return "bg-red-50 text-red-800 border-red-200";
      case "pending": return "bg-yellow-50 text-yellow-800 border-yellow-200";
      default: return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return "✅";
      case "rejected": return "❌";
      case "pending": return "⏳";
      default: return "❓";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream to-accent">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-display font-bold text-secondary-900 mb-6">
            Certificate <span className="text-gradient">Portal</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Request premium certificates for events you've participated in. 
            Our executive team will review and approve your requests.
          </p>
        </div>

        {/* Request New Certificate Button */}
        <div className="text-center mb-12 animate-slide-up">
          <button
            onClick={() => setShowForm(true)}
            className="luxury-button text-lg"
          >
            🏆 Request New Certificate
          </button>
        </div>

        {/* Certificate Request Form */}
        {showForm && (
          <div className="modal-backdrop flex items-center justify-center p-4">
            <div className="luxury-card max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-display font-bold text-secondary-900">Request Certificate</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-secondary-400 hover:text-secondary-600 text-2xl transition-colors"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="premium-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Student Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.studentEmail}
                      onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                      className="premium-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="premium-input"
                      placeholder="Enter your student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Certificate Type
                    </label>
                    <select
                      value={formData.certificateType}
                      onChange={(e) => setFormData({ ...formData, certificateType: e.target.value as any })}
                      className="premium-input"
                    >
                      <option value="participation">Participation</option>
                      <option value="completion">Completion</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.eventTitle}
                      onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                      className="premium-input"
                      placeholder="Name of the event"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="premium-input"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="luxury-button flex-1"
                  >
                    🏆 Submit Request
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

        {/* My Certificate Requests */}
        <div className="luxury-card animate-slide-up">
          <div className="p-8 border-b border-primary-100">
            <h2 className="text-3xl font-display font-bold text-secondary-900 flex items-center">
              <span className="text-3xl mr-3">📜</span>
              My Certificate Requests
            </h2>
          </div>
          
          {myRequests === undefined ? (
            <div className="flex justify-center py-20">
              <div className="loading-shimmer w-12 h-12 rounded-full"></div>
            </div>
          ) : myRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-6xl">📋</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">No Requests Yet</h3>
              <p className="text-secondary-600 text-lg">Submit your first certificate request to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-primary-100">
              {myRequests.map((request) => (
                <div key={request._id} className="p-8 hover:bg-accent-pearl transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-secondary-900 mb-2">
                        {request.eventTitle}
                      </h3>
                      <p className="text-secondary-600 text-lg">{request.studentName} • {request.studentId}</p>
                    </div>
                    <div className="flex items-center mt-4 lg:mt-0">
                      <span className="text-2xl mr-3">{getStatusIcon(request.status)}</span>
                      <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-secondary-600 mb-4">
                    <div>
                      <span className="font-semibold">Event Date:</span>
                      <p>{request.eventDate}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Certificate Type:</span>
                      <p className="capitalize">{request.certificateType}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Requested:</span>
                      <p>{new Date(request._creationTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {request.reviewNotes && (
                    <div className="bg-accent-pearl rounded-xl p-4">
                      <span className="font-semibold text-secondary-700 block mb-2">Review Notes:</span>
                      <p className="text-secondary-600">{request.reviewNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
