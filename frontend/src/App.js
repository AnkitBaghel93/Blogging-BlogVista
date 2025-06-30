
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Blog from "./components/blog/Blog";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div >

    <Router>
              <Navbar/>

              <Routes>
                    <Route exact path ='/' element ={ <Home/>}/>
                    <Route  path ='/blog' element ={ <Blog/>}/>
                    <Route  path ='/signup' element ={ <Signup/>}/>
                    <Route  path ='/signin' element ={ <Signin/>}/>
                    
              </Routes>

         <Footer/>
           
      </Router>
   </div>

  );
}

export default App;
