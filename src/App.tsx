import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import Home from './pages/Home';
import News from './pages/News';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Quote from './pages/Quote';
import ServiceDetail from './pages/ServiceDetail';
import Services from './pages/Services';

function LangRoutes({ base }: { base: string }) {
  // base '' for EN, '/ar' for AR — React Router handles via nested paths
  void base;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="clients" element={<Clients />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="quote" element={<Quote />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  // '/CIVAC' on GitHub Pages builds (vite --base), '/' everywhere else (local dev, root domain)
  const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';
  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/ar/*" element={<LangRoutes base="/ar" />} />
          <Route path="/*" element={<LangRoutes base="" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
