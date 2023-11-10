import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import http from '../http';


export default function Edit() {
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const [users, setUsers] = useState([]);
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputs({ ...inputs,[name]:value });
    }

    useEffect(()=>{
        http.get(`/users/${id}/edit`).then((res)=>{
            setInputs(res.data.data);
        })
    },[]);
  
    
    const vavigate = useNavigate();
    const hadleSubmit = () =>{
        http.patch('/users/'+id, inputs).then((res)=>{
            vavigate('/');
        })
    }

    return (
        <div>
            <div className='container mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Edit User <Link to='/' className='btn btn-sm btn-primary float-end' >Back </Link> </h2>
                    </div>
                    <div className='card-body'>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name='name' className="form-control" value={ inputs.name || '' }  onChange={handleChange}  />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name='email' className="form-control" value={ inputs.email || '' } onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea  name='address' className='form-control' value={ inputs.address || '' } onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name='phone' className="form-control" value={ inputs.phone || '' } onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name='gender' className='form-control' onChange={handleChange}>
                                <option value={inputs.gender}>{inputs.gender}</option>
                                <option value=''>Select Gender</option>
                                <option value='Male' >Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name='city' value={ inputs.city || '' } className="form-control" onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={hadleSubmit} >Submit</button>

                    </div>

                </div>

            </div>
        </div>
    )
}