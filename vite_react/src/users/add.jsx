import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import http from '../http';


export default function Add() {
    const vavigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleInputs = (e) =>{
        const {name, value} = e.target;
        setInputs({ ...inputs,[name]:value });
    }

    const submitForm = () =>{
        http.post('/users', inputs).then((res)=>{
            vavigate('/');
        })
    }

    return (
        <div>
            <div className='container mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Create User <Link to='/' className='btn btn-sm btn-primary float-end' >Back </Link> </h2>
                    </div>
                    <div className='card-body'>

                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name='name' class="form-control" onChange={ handleInputs } />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" name='email' class="form-control" onChange={ handleInputs } />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name='password' class="form-control" placeholder="Password" onChange={ handleInputs } />
                        </div>

                        <div class="form-group">
                            <label>Address</label>
                            <textarea className='form-control' name='address' onChange={ handleInputs } />
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="text" name='phone' class="form-control" onChange={ handleInputs } />
                        </div>
                        <div class="form-group">
                            <label>Gender</label>
                            <select name='gender' className='form-control' onChange={ handleInputs }>
                                <option value=''>Select Gender</option>
                                <option value='Male' >Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" name='city' class="form-control" onChange={ handleInputs } />
                        </div>

                       

                        <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>

                    </div>

                </div>

            </div>
        </div>
    )
}