import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';
import AppNavbar from './components/AppNavbar';
import StreamList from './components/StreamList'
import StreamModal from './components/StreamModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <StreamModal />
          <StreamList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
