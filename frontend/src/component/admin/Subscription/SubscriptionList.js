import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSubscriptions } from '../../../features/subscriptionSlice';


export default function SubscriptionList() {
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post('/api/subscription/list').then((response) => {
      setRecords(response.data.payload);

      dispatch(setSubscriptions(response.data.payload));

    });
  }, [dispatch]);

  const deleteTask = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      axios.delete(`/api/subscription/${id}`).then((response) => {
        if (response.data.success) {
          toast.success(response.data.success);
          axios.post('/api/subscription/list').then((response2) => setRecords(response2.data.payload));
        } else {
          toast.error(response.data.error);
        }
      });
    }
  };

  const columns = [
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
            <Link to={`/admin/subscription-edit/${row.id}`}>
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
        return row.email.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setRecords(newData);
    } else {
      axios.post('/api/subscription/list').then((response) => setRecords(response.data.payload));
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
                        Subscription Listing
                      </h5>
                      <input type='text' onChange={handleFilter} style={{ float: 'right', width: '200px' }} placeholder='Search...' className='form-control' />
                      <Link to='/admin/subscription-add' className='btn btn-primary text-white mr-2' style={{ float: 'right' }}>
                        Create Subscription
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
