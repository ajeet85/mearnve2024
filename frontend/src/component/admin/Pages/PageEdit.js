import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link,useParams } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { editContent,fetchContent } from '../../../features/homeSlice';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { apiKey, editorConfig } from '../../../tinymceConfig';

import AdminSidenav from '../AdminLayout/AdminSidenav';
import AdminTopNav from '../AdminLayout/AdminTopNav';
import AdminFooter from '../AdminLayout/AdminFooter';

export default function PageEdit() {

  const { REACT_APP_API_URL_LOCAL_SERVER, REACT_APP_API_URL_PRODUCTION_SERVER, REACT_APP_ENV_TYPE } = process.env;
  const baseURL = REACT_APP_ENV_TYPE === 'production' ? REACT_APP_API_URL_PRODUCTION_SERVER : REACT_APP_API_URL_LOCAL_SERVER;


  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const contentList = useSelector((state) => state.home.contentList);
  const initialValues = { pageTitle: '', content_section: '', menu: '' };


  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    dispatch(fetchContent());
}, [dispatch]);

useEffect(() => {
  if (id && contentList.length > 0) {
    const parsedId = parseInt(id);
    const singleContent = contentList.find((ele) => ele.id === parsedId);
    setFormData(singleContent || { pageTitle: '', content_section: '' });

    // Set the previewUrl if image is present in the singleContent
    if (singleContent && singleContent.image) {
      setPreviewUrl('/uploads/'+singleContent.image);
      setFile(singleContent.image);
    }

  } else {
    navigate('/admin/page');
  }

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/menu`);
      setMenuData(response.data);
    } catch (error) {
      console.error('Failed to fetch menu data:', error);
      setMenuData([]);
    }
  };

  fetchMenuData();

}, [id, contentList, navigate,baseURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, content_section: content });
  };

  const handleEditorChange2 = (content, editor) => {
    setFormData({ ...formData, content_section2: content });
  };

  const handleEditorChange3 = (content, editor) => {
    setFormData({ ...formData, content_section3: content });
  };

  const handleEditorChange4 = (content, editor) => {
    setFormData({ ...formData, content_section4: content });
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      const formDataWithFile = new FormData();
  
      formDataWithFile.append('image', image); // Use 'image' as the key
      for (let key in formData) {
        formDataWithFile.append(key, formData[key]);
      }

       //Log the FormData contents
        // for (let pair of formDataWithFile.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }

      //  console.log(formDataWithFile);
      dispatch(editContent(formDataWithFile))
        .then((res) => {
          if(res.payload.status){
            toast.success(res.payload.message);
            navigate('/admin/page');
          }else{
            toast.error(res.payload.message);
          }
          
        })
        .catch((error) => {
          toast.error('Failed to update content');
          console.error('Submission failed', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update the image state with the selected file
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.pageTitle.trim()) {
      errors.pageTitle = 'Page Title is required';
    }
    if (!values.menu) {
      errors.menu = 'Menu is required';
    }
    return errors;
  };

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
                      <h5 className='card-title' style={{ float: 'left' }}>Update Page</h5>
                      <Link to='/admin/page' className='btn btn-primary text-white mr-2' style={{ float: 'right' }}>
                        Back
                      </Link>
                    </div>
                    <div className='card-body'>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label htmlFor='menu'>Select Menu</label>
                            {menuData.length > 0 ? (
                              <select
                                id='menu'
                                name='menu'
                                value={formData.menu || ''}
                                onChange={handleChange}
                                className='form-control custom-select'
                              >
                                <option value="">Select Status</option>
                                {menuData.map(menuItem => (
                                  <option key={menuItem.id} value={menuItem.slug}>{menuItem.title}</option>
                                ))}
                              </select>
                            ) : (
                              <p>Loading menu...</p>
                            )}
                            {errors.menu && <p className='mt-0 text-danger'>{errors.menu}</p>}
                          </div>
                        </div>

                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label htmlFor='pageTitle'>Page Title</label>
                              <input
                                type='text'
                                name='pageTitle'
                                value={formData.pageTitle}
                                onChange={handleChange}
                                className='form-control'
                                id='pageTitle'
                                placeholder='Page Title'
                              />
                              {errors.pageTitle && <p className='mt-0 text-danger'>{errors.pageTitle}</p>}
                            </div>
                          </div>
                          <div className='col-md-12'>
                              <div className='form-group'>
                                <label htmlFor='pageTitle'>Section 1</label>
                                <Editor
                                  apiKey={apiKey}
                                  init={editorConfig}
                                  value={formData.content_section}
                                  onEditorChange={handleEditorChange}
                                />
                              </div>
                          </div>

                          <div className='col-md-12'>
                              <div className='form-group'>
                                <label htmlFor='pageTitle'>Section 2</label>
                                <Editor
                                  apiKey={apiKey}
                                  init={editorConfig}
                                  value={formData.content_section2}
                                  onEditorChange={handleEditorChange2}
                                />
                              </div>
                          </div>

                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label htmlFor='pageTitle3'>Section 3</label>
                              <Editor
                                apiKey={apiKey}
                                init={editorConfig}
                                value={formData.content_section3}
                                onEditorChange={handleEditorChange3}
                              />
                              </div>
                          </div>

                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label htmlFor='pageTitle3'>Section 4</label>
                              <Editor
                                apiKey={apiKey}
                                init={editorConfig}
                                value={formData.content_section4}
                                onEditorChange={handleEditorChange4}
                              />
                              </div>
                          </div>

                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label htmlFor='file'>File</label>
                              <input
                                type='file'
                                name='image'
                                onChange={handleFileChange}
                                className='form-control'
                                id='file'
                              />
                              {previewUrl && (
                                <img src={previewUrl} alt='Preview' style={{ width: '200px', marginTop: '10px' }} />
                              )}
                            </div>
                          </div>
                          <div className='col-md-12'>
                            <button type='submit' className='btn btn-success btn-sm' disabled={isSubmitting}>
                              {isSubmitting ? 'Submitting...' : 'Submit'}
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
