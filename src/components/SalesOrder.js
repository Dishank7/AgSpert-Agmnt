import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
    'Product 6',
    'Product 7',
    'Product 8',
    'Product 9',
    'Product 10',
];


const fetchData = async () => {
    const response = await fetch('data/productData.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const SalesOrder = () => {

    const navigate = useNavigate();
    const [products, setProduct] = React.useState([]);
   
    
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProduct(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");

        if (!username || !password) {
            alert('Please Enter All The Fields');
            navigate('/');
            return;
        }

    })

    const { data, error, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
    });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
   
    return (
        <div>
            <div className="dropdown-wrapper">
                <FormControl sx={{ m: 1, width: "70%" }}>
                    <InputLabel id="demo-multiple-checkbox-label">Products</InputLabel>
                    <Select style={{ background: "white" }}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={products}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={products.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{display:"flex", flexDirection:"column",gap:"40px" ,marginTop:"30px"}}>
            {
                
                    data[0]?.sku?.map((item, key) => (
                        <div className="sale-order-wrapper">
                            <div className="sale-order-detail-div">
                                <h3>{key + 1}. SKU {item.id} {`(${item.amount} ${item.unit})`}</h3>
                                <h3>Rate : ₹ {item.max_retail_price}</h3>
                            </div>
                            <div className="input-div">
                                <div>
                                    <label for="sell-rate" >Selling rate</label><br />
                                    <input type="text" id="sell-rate" placeholder="Enter Selling Rate" />
                                </div>
                                <div>
                                    <label for="total-item">Total item</label><br />
                                    <input type="text" id="total-item" placeholder="Enter Quantity" />
                                </div>
                            </div>
                            <span className="floating-span">{item.quantity_in_inventory} item{`(s)`} remaining</span>
                        </div>
                
                ))
            
            }
        </div>    
        </div >
    )
}

export default SalesOrder;