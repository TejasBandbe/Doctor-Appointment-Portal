import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Booked from './components/Booked';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/booked' component={Booked}></Route>
        </Router>
        <ToastContainer
        position='top-center'
        pauseOnHover={false}
        closeOnClick={true}/>
      </div>
    </div>
  );
}

export default App;
