import PageHeader from './assets/components/Header';
import PageFooter from './assets/components/Footer';
import Table from './assets/components/Table';
import Training from './assets/components/Training';
import NoMatch from './assets/components/NoMatch';
import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { WordsContextProvider } from './assets/context/Words';

function App() {
  return (
    <Router>
      <div className='App'>
        <PageHeader />
        <WordsContextProvider>
          <main className='mainContainer'>
            <Routes>
              <Route path='/' element={<Table />} />
              <Route path='/game' element={<Training />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </main>
        </WordsContextProvider>
        <PageFooter />
      </div>
    </Router>
  );
}

export default App;
