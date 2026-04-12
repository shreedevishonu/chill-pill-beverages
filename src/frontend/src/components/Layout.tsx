import { Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import Footer from "./Footer";
import GlobalCartSidebar from "./GlobalCartSidebar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A1A" }}
    >
      <Navbar />
      <main
        key={location.pathname}
        className="flex-1 flex flex-col"
        style={{ minHeight: 0 }}
      >
        {children ?? <Outlet />}
      </main>
      <Footer />
      <GlobalCartSidebar />
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(26,26,46,0.97)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </div>
  );
}
