import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LenisProvider from "./components/LenisProvider.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import BackToTop from "./components/BackToTop.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Research from "./pages/Research.jsx";
import Education from "./pages/Education.jsx";
import LivingLabs from "./pages/LivingLabs.jsx";
import Partnerships from "./pages/Partnerships.jsx";
import People from "./pages/People.jsx";
import Publications from "./pages/Publications.jsx";
import Events from "./pages/Events.jsx";
import NewsMedia from "./pages/NewsMedia.jsx";
import Resources from "./pages/Resources.jsx";
import SDGs from "./pages/SDGs.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LenisProvider>
  );
}
