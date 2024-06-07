import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SubscriptionEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialValues = { email: '',status: '' };
  const [formData, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      axios.put(`/api/subscription/${id}`, formData)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.success);
            setFormValues(initialValues);
            navigate('/admin/subscription');
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((error) => {
          console.error('Submission failed', error);
        })
        .finally(() => {
          setIsSubmit(false);
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    
    return errors;
  };

  useEffect(() => {
    axios.get(`/api/subscription/${id}`)
      .then((response) => {
        setFormValues(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  return (
    <div className='adminApp'>
      <AdminTopNav />
      <div id='layoutSidenav'>
        <AdminSidenav />
        <div id='layoutSidenav_content'>
          <main>
            <div className='container-fluid px-4 mt-4'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card card-dark'>
                    <div className='card-header bg-dark text-white'>
                      <h5 className='card-title' style={{ float: 'left' }}>Edit Subscription</h5>
                      <div className='card-tools'>
                        <Link to='/admin/subscription' className='btn btn-primary btn-sm' style={{ float: 'right' }}> Back</Link>
                      </div>
                    </div>
                    <div className='card-body'>
                      <form onSubmit={handleSubmit}>
                        <div className='row'>
                          
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor='email'>Email</label>
                              <input name='email' value={formData.email} onChange={handleInputChange} type='text' className='form-control' id='email' placeholder='Email' />
                              <p className='mt-0 text-danger'>{formErrors.email}</p>
                            </div>
                          </div>
                        
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor='status'>Status</label>
                              <select id='status' name='status' value={formData.status} onChange={handleInputChange} className='form-control custom-select'>
                                <option value='1'>Subscribe</option>
                                <option value='0'>Unsubscribe</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-md-12'>
                            <button type='submit' className='btn btn-success btn-sm' disabled={isSubmit}>
                              {isSubmit ? 'Submitting...' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
