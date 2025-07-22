import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { Home } from "./components/Home";
import { Events } from "./components/Events";
import { Notifications } from "./components/Notifications";
import { CertificatePortal } from "./components/CertificatePortal";
import { Magazine } from "./components/Magazine";
import { Gallery } from "./components/Gallery";
import { AdminPanel } from "./components/AdminPanel";

type Page = "home" | "events" | "notifications" | "certificates" | "magazine" | "gallery" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-effect border-b border-primary-100/50">
        <div className="container-max">
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8">
              <div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setCurrentPage("home")}
              >
                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-xl font-bold text-white">EEA</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-display font-bold text-secondary-900">Electronics Engineering</h1>
                  <p className="text-sm text-primary-600 font-medium">Association</p>
                </div>
              </div>
              
              <nav className="hidden lg:flex space-x-1">
                {[
                  { id: "home", label: "Home", icon: "🏠" },
                  { id: "events", label: "Events", icon: "📅" },
                  { id: "notifications", label: "Notifications", icon: "📢" },
                  { id: "certificates", label: "Certificates", icon: "🏆" },
                  { id: "magazine", label: "Magazine", icon: "📖" },
                  { id: "gallery", label: "Gallery", icon: "📸" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? "bg-gradient-gold text-white shadow-gold"
                        : "text-secondary-600 hover:text-secondary-900 hover:bg-primary-50"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <ExecutiveButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Content currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </main>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}

function ExecutiveButton({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void }) {
  const isExecutive = useQuery(api.userProfiles.checkIsExecutive);

  if (!isExecutive) return null;

  return (
    <button
      onClick={() => setCurrentPage("admin")}
      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
        currentPage === "admin"
          ? "bg-gradient-dark text-white shadow-xl"
          : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
      }`}
    >
      <span className="text-sm">👑</span>
      <span className="text-sm hidden sm:inline">Executive</span>
    </button>
  );
}

function Content({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void }) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading-shimmer w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <Unauthenticated>
        <div className="min-h-screen bg-gradient-luxury flex items-center justify-center p-4">
          <div className="luxury-card max-w-md w-full p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                <span className="text-2xl font-bold text-white">EEA</span>
              </div>
              <h1 className="text-3xl font-display font-bold text-secondary-900 mb-2">
                Welcome to <span className="text-gradient">EEA</span>
              </h1>
              <p className="text-secondary-600">Sign in to access the premium portal</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === "events" && <Events />}
        {currentPage === "notifications" && <Notifications />}
        {currentPage === "certificates" && <CertificatePortal />}
        {currentPage === "magazine" && <Magazine />}
        {currentPage === "gallery" && <Gallery />}
        {currentPage === "admin" && <AdminPanel />}
      </Authenticated>
    </div>
  );
}
