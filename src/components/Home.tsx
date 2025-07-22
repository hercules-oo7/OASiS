import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface HomeProps {
  setCurrentPage: (page: "home" | "events" | "notifications" | "certificates" | "magazine" | "gallery" | "admin") => void;
}

export function Home({ setCurrentPage }: HomeProps) {
  const recentEvents = useQuery(api.events.list, { limit: 3 });
  const recentNotifications = useQuery(api.notifications.list, { limit: 3 });
  const recentMagazines = useQuery(api.magazines.list, { limit: 2 });
  const isExecutive = useQuery(api.userProfiles.checkIsExecutive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-accent to-accent-pearl">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-luxury opacity-5"></div>
        <div className="container-max section-padding relative">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-gold rounded-full mb-8 shadow-gold">
              <span className="text-4xl text-white font-bold">EEA</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-display font-bold text-secondary-900 mb-6 leading-tight">
              Electronics Engineering
              <span className="block text-gradient">Association</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Empowering the next generation of electronics engineers through 
              <span className="text-primary-600 font-semibold"> innovation</span>, 
              <span className="text-primary-600 font-semibold"> collaboration</span>, and 
              <span className="text-primary-600 font-semibold"> excellence</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => setCurrentPage("events")}
                className="luxury-button text-lg"
              >
                ✨ Explore Events
              </button>
              <button
                onClick={() => setCurrentPage("certificates")}
                className="bg-white/80 backdrop-blur-sm text-secondary-900 px-8 py-4 rounded-xl font-semibold border-2 border-primary-200 hover:border-primary-400 hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-elegant hover:shadow-luxury text-lg"
              >
                🏆 Request Certificate
              </button>
              {isExecutive && (
                <button
                  onClick={() => setCurrentPage("admin")}
                  className="bg-gradient-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
                >
                  👑 Executive Panel
                </button>
              )}
            </div>
          </div>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-slide-up">
            {[
              { number: "50+", label: "Events Organized", icon: "🎯", color: "from-blue-500 to-blue-600" },
              { number: "500+", label: "Active Members", icon: "👥", color: "from-green-500 to-green-600" },
              { number: "25+", label: "Workshops Conducted", icon: "🔧", color: "from-purple-500 to-purple-600" },
              { number: "12", label: "Magazine Issues", icon: "📚", color: "from-orange-500 to-orange-600" },
            ].map((stat, index) => (
              <div key={index} className="luxury-card p-8 text-center hover-lift group">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl font-display font-bold text-secondary-900 mb-2">{stat.number}</div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container-max px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="luxury-card p-8 hover-lift">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-secondary-900 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Recent Events
              </h2>
              <button
                onClick={() => setCurrentPage("events")}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentEvents?.map((event) => (
                <div key={event._id} className="bg-accent-pearl rounded-xl p-4 hover-glow">
                  <h3 className="font-semibold text-secondary-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-secondary-600 mb-2">{event.date} • {event.location}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    event.type === "workshop" ? "bg-blue-100 text-blue-800" :
                    event.type === "seminar" ? "bg-green-100 text-green-800" :
                    event.type === "competition" ? "bg-purple-100 text-purple-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {event.type}
                  </span>
                </div>
              )) || (
                <div className="text-secondary-500 text-center py-8">
                  <span className="text-4xl mb-2 block">📅</span>
                  No events yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="luxury-card p-8 hover-lift">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-secondary-900 flex items-center">
                <span className="text-2xl mr-3">📢</span>
                Notifications
              </h2>
              <button
                onClick={() => setCurrentPage("notifications")}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentNotifications?.map((notification) => (
                <div key={notification._id} className="bg-accent-pearl rounded-xl p-4 hover-glow">
                  <h3 className="font-semibold text-secondary-900 text-sm mb-1">{notification.title}</h3>
                  <p className="text-xs text-secondary-600 mb-2 line-clamp-2">{notification.content}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    notification.priority === "high" ? "bg-red-100 text-red-800" :
                    notification.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {notification.priority} priority
                  </span>
                </div>
              )) || (
                <div className="text-secondary-500 text-center py-8">
                  <span className="text-4xl mb-2 block">🔔</span>
                  No notifications
                </div>
              )}
            </div>
          </div>

          {/* Recent Magazines */}
          <div className="luxury-card p-8 hover-lift">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-secondary-900 flex items-center">
                <span className="text-2xl mr-3">📖</span>
                Latest Magazines
              </h2>
              <button
                onClick={() => setCurrentPage("magazine")}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentMagazines?.map((magazine) => (
                <div key={magazine._id} className="flex items-start space-x-4 bg-accent-pearl rounded-xl p-4 hover-glow">
                  {magazine.coverImageUrl && (
                    <img
                      src={magazine.coverImageUrl}
                      alt={magazine.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 text-sm mb-1">{magazine.title}</h3>
                    <p className="text-xs text-secondary-600 mb-1">Issue {magazine.issue}</p>
                    <p className="text-xs text-secondary-500">{magazine.publishDate}</p>
                  </div>
                </div>
              )) || (
                <div className="text-secondary-500 text-center py-8">
                  <span className="text-4xl mb-2 block">📚</span>
                  No magazines yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="luxury-card p-12 bg-gradient-to-r from-primary-50 to-primary-100">
            <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4">
              Join the <span className="text-gradient">EEA Community</span>
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Be part of a prestigious community that shapes the future of electronics engineering
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentPage("events")}
                className="luxury-button"
              >
                🚀 Get Started
              </button>
              <button
                onClick={() => setCurrentPage("gallery")}
                className="bg-white text-secondary-900 px-8 py-4 rounded-xl font-semibold border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1 shadow-elegant hover:shadow-luxury"
              >
                📸 View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
