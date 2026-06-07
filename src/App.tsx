import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { useEffect } from 'react';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import BacktestPage from './pages/BacktestPage';
import JournalPage from './pages/JournalPage';
import ExamsPage from './pages/ExamsPage';
import CertificatesPage from './pages/CertificatesPage';

// Module Pages
import Module1Page from './modules/module1/Module1Page';
import Module2Page from './modules/module2/Module2Page';
import Module3Page from './modules/module3/Module3Page';
import Module4Page from './modules/module4/Module4Page';
import Module5Page from './modules/module5/Module5Page';
import Module6Page from './modules/module6/Module6Page';
import Module7Page from './modules/module7/Module7Page';
import Module8Page from './modules/module8/Module8Page';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="modules/1/*" element={<Module1Page />} />
          <Route path="modules/2/*" element={<Module2Page />} />
          <Route path="modules/3/*" element={<Module3Page />} />
          <Route path="modules/4/*" element={<Module4Page />} />
          <Route path="modules/5/*" element={<Module5Page />} />
          <Route path="modules/6/*" element={<Module6Page />} />
          <Route path="modules/7/*" element={<Module7Page />} />
          <Route path="modules/8/*" element={<Module8Page />} />
          <Route path="backtest" element={<BacktestPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
