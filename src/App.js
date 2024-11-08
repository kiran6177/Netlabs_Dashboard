import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Reports from './Components/Reports';
import ScrollToTop from './Custom/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Sidebar/>} >
          <Route index element={<Dashboard/>} />
          <Route path='/reports' element={<Reports/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
