import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Magazine() {
  const magazines = useQuery(api.magazines.list, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">EEA Magazine</h1>
        <p className="text-lg text-gray-600">
          Explore our collection of technical articles, research papers, and student contributions
        </p>
      </div>

      {magazines === undefined ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : magazines.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No magazines published yet</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magazines.map((magazine) => (
            <div
              key={magazine._id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              {magazine.coverImageUrl && (
                <img
                  src={magazine.coverImageUrl}
                  alt={magazine.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Issue {magazine.issue}
                  </span>
                  <span className="text-sm text-gray-500">{magazine.publishDate}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{magazine.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{magazine.description}</p>
                
                {magazine.pdfUrl && (
                  <div className="flex space-x-3">
                    <a
                      href={magazine.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Read Online
                    </a>
                    <a
                      href={magazine.pdfUrl}
                      download
                      className="flex-1 border border-blue-600 text-blue-600 text-center py-2 px-4 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Article Section */}
      {magazines && magazines.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured in Latest Issue</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Technical Excellence in Electronics
                </h3>
                <p className="text-gray-700 mb-6">
                  Our latest issue features cutting-edge research in embedded systems, 
                  IoT applications, and sustainable electronics. Discover innovative 
                  projects from our students and faculty members.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Advanced Microcontroller Programming</div>
                  <div>• Renewable Energy Systems</div>
                  <div>• AI in Electronics Design</div>
                  <div>• Student Project Showcases</div>
                </div>
              </div>
              {magazines[0].coverImageUrl && (
                <div className="flex justify-center">
                  <img
                    src={magazines[0].coverImageUrl}
                    alt="Latest Magazine"
                    className="w-64 h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
