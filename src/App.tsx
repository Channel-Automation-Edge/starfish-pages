import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import FormPage from './Pages/FormPage';
import ContractorResults from './Pages/ContractorResults';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/formpage' element={<FormPage/>} />
        <Route path='/contractor-results' element={<ContractorResults/>} />
      </Routes>
    </>
  );
}

export default App;