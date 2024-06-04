import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerOrder from "./components/CustomersOrder";
import LoginForm from "./components/Login";
import SalesOrder from "./components/SalesOrder";

const App = () => {
  return (
    <div >
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/customer-order" element={<CustomerOrder/>}/>
          <Route path="/sale-order" element={<SalesOrder/>}/>
          </Routes>
          
      </BrowserRouter>
      
    </div>
  );
}

export default App;
