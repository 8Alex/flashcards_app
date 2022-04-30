import PageHeader from './assets/components/Header';
import PageFooter from './assets/components/Footer';
import Table from './assets/components/Table';
import Training from './assets/components/Training';
import NoMatch from './assets/components/NoMatch';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <PageHeader></PageHeader>
        <main className='mainContainer'>
          <Routes>
            <Route path='/' element={<Table></Table>} />
            <Route path='/game' element={<Training></Training>} />
            <Route path='*' element={<NoMatch></NoMatch>} />
          </Routes>
        </main>
        <PageFooter></PageFooter>
      </div>
    </Router>
  );
}

export default App;
