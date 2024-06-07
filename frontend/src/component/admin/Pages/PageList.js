import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContent, deleteContent }  from '../../../features/homeSlice';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';
import DataTable from 'react-data-table-component';


function PageListComponent() {
  const contentList = useSelector(state => state.home.contentList);
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const status = useSelector(state => state.home.status);
  const error = useSelector(state => state.home.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContent());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setRecords(contentList);
  }, [contentList]);

  const handleDeleteContent = (id) => {
    dispatch(deleteContent(id));
  };

  const handleFilter = (event) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue) {
      const newData = records.filter((row) => {
        return row.pageTitle.toLowerCase().includes(inputValue) || (row.status === 1 ? 'active' : 'inactive').toLowerCase().includes(inputValue);
      });
      setRecords(newData);
    } else {
      dispatch(fetchContent());
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
      name: 'Page Title',
      selector: (row) => row.pageTitle,
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
          <Link to={`/admin/page-edit/${row.id}`}>
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
                        Page Listing
                      </h5>
                      <input type='text' onChange={handleFilter} style={{ float: 'right', width: '200px' }} placeholder='Search...' className='form-control' />
                      <Link to='/admin/page-add' className='btn btn-primary text-white mr-2' style={{ float: 'right' }}>
                        Create Page
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

export default PageListComponent;