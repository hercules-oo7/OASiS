import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Notifications() {
  const notifications = useQuery(api.notifications.list, {});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 border-red-200 text-red-800";
      case "medium": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "low": return "bg-green-50 border-green-200 text-green-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🚨";
      case "medium": return "⚠️";
      case "low": return "ℹ️";
      default: return "📢";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream to-accent">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-display font-bold text-secondary-900 mb-6">
            <span className="text-gradient">Notifications</span> & Updates
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Stay informed with the latest announcements, updates, and important information 
            from the Electronics Engineering Association
          </p>
        </div>

        {notifications === undefined ? (
          <div className="flex justify-center py-20">
            <div className="loading-shimmer w-12 h-12 rounded-full"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-6xl">🔔</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">All Caught Up!</h3>
            <p className="text-secondary-600 text-lg">No notifications at the moment. Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            {notifications.map((notification, index) => (
              <div
                key={notification._id}
                className={`luxury-card border-l-4 hover-lift ${getPriorityColor(notification.priority)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                        <span className="text-xl">{getPriorityIcon(notification.priority)}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-secondary-900 mb-2">
                          {notification.title}
                        </h3>
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getPriorityBadgeColor(notification.priority)}`}>
                          {notification.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-secondary-700 text-lg leading-relaxed mb-6">
                    {notification.content}
                  </p>
                  
                  <div className="flex items-center text-secondary-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Posted on {new Date(notification._creationTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
