import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export function Events() {
  const events = useQuery(api.events.list, {});
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop": return "bg-blue-100 text-blue-800 border-blue-200";
      case "seminar": return "bg-green-100 text-green-800 border-green-200";
      case "competition": return "bg-purple-100 text-purple-800 border-purple-200";
      case "meeting": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "workshop": return "🔧";
      case "seminar": return "🎓";
      case "competition": return "🏆";
      case "meeting": return "👥";
      default: return "📅";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream to-accent">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-display font-bold text-secondary-900 mb-6">
            Events & <span className="text-gradient">Workshops</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Discover our premium collection of technical workshops, seminars, and competitions 
            designed to elevate your engineering expertise
          </p>
        </div>

        {events === undefined ? (
          <div className="flex justify-center py-20">
            <div className="loading-shimmer w-12 h-12 rounded-full"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-6xl">📅</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">No Events Scheduled</h3>
            <p className="text-secondary-600 text-lg">Stay tuned for exciting upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {events.map((event) => (
              <div
                key={event._id}
                className="luxury-card hover-lift cursor-pointer group overflow-hidden"
                onClick={() => setSelectedEvent(event)}
              >
                {event.imageUrl && (
                  <div className="relative overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getEventTypeColor(event.type)} flex items-center space-x-2`}>
                      <span>{getEventIcon(event.type)}</span>
                      <span>{event.type}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-6 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-secondary-700">
                      <span className="w-5 h-5 mr-3 flex items-center justify-center">📅</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center text-secondary-700">
                      <span className="w-5 h-5 mr-3 flex items-center justify-center">⏰</span>
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center text-secondary-700">
                      <span className="w-5 h-5 mr-3 flex items-center justify-center">📍</span>
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="modal-backdrop flex items-center justify-center p-4">
            <div className="luxury-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {selectedEvent.imageUrl && (
                  <div className="relative h-80 overflow-hidden rounded-t-2xl">
                    <img
                      src={selectedEvent.imageUrl}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-secondary-600 hover:text-secondary-900 hover:bg-white transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <h2 className="text-4xl font-display font-bold text-secondary-900 mb-4 sm:mb-0">
                    {selectedEvent.title}
                  </h2>
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${getEventTypeColor(selectedEvent.type)} flex items-center space-x-2`}>
                    <span>{getEventIcon(selectedEvent.type)}</span>
                    <span>{selectedEvent.type}</span>
                  </span>
                </div>
                
                <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                  {selectedEvent.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-accent-pearl rounded-2xl">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-gold rounded-xl flex items-center justify-center">
                      <span className="text-xl">📅</span>
                    </div>
                    <span className="block font-semibold text-secondary-900 mb-1">Date</span>
                    <span className="text-secondary-600">{selectedEvent.date}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-gold rounded-xl flex items-center justify-center">
                      <span className="text-xl">⏰</span>
                    </div>
                    <span className="block font-semibold text-secondary-900 mb-1">Time</span>
                    <span className="text-secondary-600">{selectedEvent.time}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-gold rounded-xl flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <span className="block font-semibold text-secondary-900 mb-1">Location</span>
                    <span className="text-secondary-600">{selectedEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
