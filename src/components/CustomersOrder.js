
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const fetchData = async () => {
    const response = await fetch('data/customerData.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
};

const CustomerOrder = () => {

    const navigate = useNavigate();
    const [isDark , setIsDark] = useState(false)

    useEffect(() => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
    

        if (!username || !password) {
            alert('Please Enter All The Fields');
            navigate('/');
            return;
        }

    })

    function setDarkMode(){
        if(isDark == false){
            
            setIsDark(true)
            document.body.style.background = 'black' 
        }
        else{
            setIsDark(false)
            document.body.style.background = 'white'
        }
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
      });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    console.log(data);

    return (
        <>
            <div className="main-customer-div">
                <div className="btn-nav">
                    <div className="left-btn-div">
                        <button>Active Sales Order</button>
                        <button>Completed Sale Order</button>
                    </div>
                    <div className="right-btn-div">
                        <button onClick={()=> navigate('/sale-order')}>+ Sale Order</button>
                        <button onClick={setDarkMode}>Dark Mode</button>
                    </div>
                </div>
                <div className="customer-order-div">
                    <table>
                        <tr>
                             <th>ID</th>
                             <th>Customer Name</th>
                             <th>Price{`(₹)`}</th>
                             <th>Last Modified</th>
                             <th>Edit/View</th>
                        </tr>
                        <tr>
                            {
                              data.map((item)=>(
                                <>
                                 <td>{item.id}</td>
                                <td>{item.customer_profile?.name}</td>
                                <td>{`(₹)`+ item.price}</td>
                                <td>00/00/0000</td>
                                <td>{`(---)`}</td>
                                </>
                              ))
                            }
                            
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CustomerOrder;