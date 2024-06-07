import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function UserList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.post('/api/users/userlist')
    .then((response) => {
      // Handle successful response
      setRecords(response.data.payload);
    })
    .catch((error) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      console.error("Config:", error.config);
    });
  

  }, []);

  const deleteTask = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      axios.delete(`/api/users/${id}`).then((response) => {
        if (response.data.success) {
          toast.success(response.data.success);
          axios.post('/api/users/userlist').then((response2) => setRecords(response2.data.payload));
        } else {
          toast.error(response.data.error);
        }
      });
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === 1 ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Action',
      selector: function (row) {
        return (
          <>
            <Link to={`/admin/user-edit/${row.id}`}>
              <i className='fa fa-edit mr-2 text-info'></i>
            </Link>
            <i className='fa fa-trash text-danger' onClick={() => deleteTask(row.id)}></i>
          </>
        );
      },
    },
  ];

  function handleFilter(event) {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue) {
      const newData = records.filter((row) => {
        return row.name.toLowerCase().includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setRecords(newData);
    } else {
      axios.post('/api/users/userlist').then((response) => setRecords(response.data.payload));
    }
  }

  return (
    <div className='adminApp'>
      <AdminTopNav></AdminTopNav>
      <div id='layoutSidenav'>
        <AdminSidenav></AdminSidenav>
        <div id='layoutSidenav_content'>
          <main>
            <div className='container-fluid px-4 mt-4'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card card-dark'>
                    <div className='card-header bg-dark text-white'>
                      <h5 className='card-title' style={{ float: 'left' }}>
                        User Listing
                      </h5>
                      <input type='text' onChange={handleFilter} style={{ float: 'right', width: '200px' }} placeholder='Search...' className='form-control' />
                      <Link to='/admin/user-add' className='btn btn-primary text-white mr-2' style={{ float: 'right' }}>
                        Create User
                      </Link>
                    </div>
                    <div className='card-body'>
                      <DataTable columns={columns} data={records} pagination></DataTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <AdminFooter></AdminFooter>
        </div>
      </div>
    </div>
  );
}
