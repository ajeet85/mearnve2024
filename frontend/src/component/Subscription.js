import React,{useState} from 'react'
//import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import {  useDispatch } from 'react-redux';
import { addSubscription } from '../features/subscriptionSlice';




export default function Subscription() {
    //const navigate = useNavigate();
    const initialValues = { email:""};
    const [formData, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //const subscriptions = useSelector(state => state.subscriptions);
    const dispatch = useDispatch();


    //const data = useSelector((state) => state.subscription.data);
   // const loading = useSelector((state) => state.subscription.loading);
    //const error = useSelector((state) => state.subscription.error);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formData, [name]: value });
      };
     
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const errors = validate(formData);
        setFormErrors(errors);
      
        if (Object.keys(errors).length === 0) {
          setIsSubmit(true);
      
          try {
            const response = await axios.post('/api/subscription/subscriptionSave', formData);
      
            if (response.data.success) {
              toast.success(response.data.success);
              // Clear the input fields
              dispatch(addSubscription(formData));
              setFormValues(initialValues);
             // navigate('/admin/user');
            } else {
              toast.error(response.data.error);
            }
          } catch (error) {
            console.error('Submission failed', error);
          } finally {
            setIsSubmit(false);
          }
        }
      };
      
      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      
     
      
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
     
      
        return errors;
      };
return (

    
        <div className="footer-newsletter">
        <form onSubmit={handleSubmit}>
        
        <input name="email" value={formData.email} onChange={handleInputChange} type="text" className="input form-control" id="email" placeholder="Email" />
        <p className='mt-0 text-danger'>{formErrors.email}</p>

        <button type="submit" className="btn btn-success btn-sm" disabled={isSubmit}>
        {isSubmit ? 'Submitting...' : 'Subscribe'}
        </button>
        </form>

        </div>


)
}