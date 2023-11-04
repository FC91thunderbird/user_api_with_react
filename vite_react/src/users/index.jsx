import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../http';


export default function Index() {
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const totalPagesToDisplay = 10;

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = () => {
        http.get(`/users?page=${currentPage}`).then((res) => {
            setUsers(res.data.data);
            setTotalPages(Math.ceil(res.data.meta.total / res.data.meta.per_page));
        })
    }

    const deleteUser = (id) => {
        http.delete('/users/' + id).then((res) => {
            fetchUsers();
        })
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startPage = Math.max(1, currentPage - Math.floor(totalPagesToDisplay / 2));
    const endPage = Math.min(totalPages, startPage + totalPagesToDisplay - 1);


    return (
        <div>
            <div className='container mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Users List <Link to='/users/create' className='btn btn-sm btn-primary float-end' >Create User </Link> </h2>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Address</td>
                                    <td>Phone</td>
                                    <td>Gender</td>
                                    <td>City</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.city}</td>

                                        <td><Link to={{ pathname: "/users/" + user.id + "/edit" }} className='btn btn-sm btn-primary' >Edit</Link> <button onClick={() => { deleteUser(user.id) }} className='btn btn-sm btn-danger' >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button onClick={handlePrevPage} className={`btn ${currentPage === 1 ? 'btn-secondary  m-2' : 'btn-info m-2'}`}>
                                Previous
                            </button>
                            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                <button
                                    key={startPage + index}
                                    onClick={() => handlePageChange(startPage + index)}
                                    className={`btn ${currentPage === startPage + index ? 'btn-info m-1' : 'btn-secondary m-1'}`}
                                >
                                    {startPage + index}
                                </button>
                            ))}
                            <button onClick={handleNextPage} className={`btn ${currentPage === totalPages ? 'btn-secondary  m-2' : 'btn-info m-2'}`}>
                                Next
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}