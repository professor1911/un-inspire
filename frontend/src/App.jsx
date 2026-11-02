import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LenisProvider from "./components/LenisProvider.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import BackToTop from "./components/BackToTop.jsx";
import OfflineNotice from "./components/OfflineNotice.jsx";

import Home from "./pages/Home.jsx";
const About = lazy(() => import("./pages/About.jsx"));
const Research = lazy(() => import("./pages/Research.jsx"));
const Education = lazy(() => import("./pages/Education.jsx"));
const LivingLabs = lazy(() => import("./pages/LivingLabs.jsx"));
const Partnerships = lazy(() => import("./pages/Partnerships.jsx"));
const People = lazy(() => import("./pages/People.jsx"));
const Publications = lazy(() => import("./pages/Publications.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const NewsMedia = lazy(() => import("./pages/NewsMedia.jsx"));
const Resources = lazy(() => import("./pages/Resources.jsx"));
const SDGs = lazy(() => import("./pages/SDGs.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageFallback() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[60vh] flex items-center justify-center font-mono text-xs uppercase tracking-wider text-bay/70" role="status">
      {t("common.loading")}…
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/education" element={<Education />} />
          <Route path="/living-labs" element={<LivingLabs />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/people" element={<People />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news-media" element={<NewsMedia />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/sdgs" element={<SDGs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-paper font-body overflow-x-hidden">
        <ScrollToTop />
        <ScrollProgress />
        <CursorGlow />
        <Header />
        <OfflineNotice />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LenisProvider>
  );
}
