import { Fragment } from 'react';
import {BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom'
import './App.css';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Landing from './Components/Layouts/Landing';
import  Navbar  from './Components/Layouts/Navbar';
import {Provider} from 'react-redux';
import store from './store'
import Alert from './Components/Alert';
const App =()=> {
  return (
    <Provider store={store}>
      <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" exact="true" element={<Landing />}/>
      </Routes>
      <section className='container'>

      <Alert />
       <Routes>
        <Route path="/login" exact="true" element={<Login />}/>
        <Route path="/register" exact="true" element={<Register />}/>
       </Routes>
      </section>
       </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
