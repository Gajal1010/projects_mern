import Header from './components/Header/Header';
import Routes from './Routes';
import GlobalStyles from './styles/globalStyles'
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <GlobalStyles />
      <Routes />
    </Router>
  );
}

export default App;
