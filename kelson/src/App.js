
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './sidebar/Sidbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import HistoryReports from './pages/HistoryReports';
import Login from './pages/Login';
import Deviation from './pages/Deviation';
import Compression from './pages/Compression';
import TempVariation from './pages/TempVariation';
const App = () => {
  return (
  <Router>
    <Routes>
    <Route  path='/' element={<Login/>}/>
      <Route  element={<Sidebar/>} >
      <Route path='/home' element={<Home/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/history' element={<HistoryReports/>}/>
    <Route path='/deviation' element={<Deviation/>}  />
    <Route path='/compression' element={<Compression/>}  />
    <Route path='/tempVariation' element={<TempVariation/>} />
      </Route>
      
    </Routes>
  </Router>
  )
}

export default App



