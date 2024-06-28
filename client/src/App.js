import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormsPage from './components/layout/FormsPage.js';
import DetaillsPage from './components/layout/DetaillsPage.js';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

const Title = () => {
  return <h1 className='title'>PEOPLE AND THEIR CARS</h1>;
};


const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Title />
        <Routes>
          <Route path="/" element={<FormsPage />} />
          <Route path="/addForms" element={<FormsPage />} />
          <Route path="/person/:id" element={<DetaillsPage />} />
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;