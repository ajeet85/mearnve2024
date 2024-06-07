import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcallRequest, deletecallRequest }  from '../../../features/callrequestSlice';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';
import DataTable from 'react-data-table-component';


function CallrequestList() {
  const registerList = useSelector(state => state.callrequest.callrequestList);
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector(state => state.callrequest.status);
  const error = useSelector(state => state.callrequest.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchcallRequest());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setRecords(registerList);
  }, [registerList]);

  const handleDeleteContent = (id) => {
    dispatch(deletecallRequest(id));
  };

  const handleFilter = (event) => {
    
    const inputValue = event.target.value;
    if (inputValue) {
      const newData = records.filter((row) => {
        return (row.firstname+row.lastname).toLowerCase().includes(inputValue) ||  row.email.toLowerCase().includes(inputValue) || row.company.toLowerCase().includes(inputValue) ;
      });
      setRecords(newData);
    } else {
      dispatch(fetchcallRequest());
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.firstname +' '+ row.lastname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Company',
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === 1 ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <Link to={`/admin/request-callback-edit/${row.id}`}>
            <i className='fa fa-edit mr-2 text-info'></i>
          </Link>
          <i className='fa fa-trash text-danger' onClick={() => handleDeleteContent(row.id)}></i>
        </>
      ),
    },
  ];

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
                       Callback Request Data Listing
                      </h5>
                      <input type='text' onChange={handleFilter} style={{ float: 'right', width: '200px' }} placeholder='Search...' className='form-control' />
                     
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

export default CallrequestList;