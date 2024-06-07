import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addcallRequest } from '../features/callrequestSlice';
import toast from 'react-hot-toast';


export default function CallbackRequest({ showModal, handleClose  }) {
  const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        email: '',
        phone: '',
        message: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        setErrors(formErrors);
      
        if (Object.keys(formErrors).length === 0 ) {
          setIsSubmitting(true);
        
          dispatch(addcallRequest(formData))
            .then(() => {
              toast.success('Data added successfully');
              setFormData( { firstName: '',
              lastName: '',
              company: '',
              country: '',
              email: '',
              phone: '',
              message: ''});

              handleClose();
             
            })
            .catch((error) => {
              toast.error('Failed to add content');
              console.error('Submission failed', error);
            })
            .finally(() => {
              setIsSubmitting(false);
              
            });
        } else {
          toast.error('Please fill all required fields');
          setFormData({ ...formData }); // Reset captcha input and value
        }
      };

      const validate = (values) => {
        const errors = {};
       
        if (!values.firstName.trim()) {
          errors.firstName = 'First Name is required';
        }
        if (!values.lastName.trim()) {
            errors.lastName = 'Last Name is required';
          }
          if (!values.company.trim()) {
            errors.company = 'Company is required';
          }

          if (!values.country.trim()) {
            errors.country = 'Country  is required';
          }

          if (!values.phone) {
            errors.phone = 'Phone is required';
          } else if (!/^\d+$/.test(values.phone)) {
            errors.phone = 'Phone must be numeric';
          }
      
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
          }

          if (!values.message.trim()) {
            errors.message = 'Message  is required';
          }
          
          
        return errors;
      };

  return (
    <div  className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal-register" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close-button" onClick={handleClose}>&times;</button>
            <form onSubmit={handleSubmit}>
            <div className="register-form-section">
                              <div className="register-form-row">
                                <div className="register-form-left">First Name</div>
                                <div className="register-form-right">   
     <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />   
     {errors.firstName && <p className='mt-0 text-danger'>{errors.firstName}</p>}                           
                                </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Last Name</div>
                                <div className="register-form-right">
                                    
                                    
                                    
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /> 
                                    {errors.lastName && <p className='mt-0 text-danger'>{errors.lastName}</p>}    
                                    </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Company</div>
                                <div className="register-form-right">
                                <input type="text" name="company" value={formData.company} onChange={handleChange} /> 
      
                                {errors.company && <p className='mt-0 text-danger'>{errors.company}</p>}                          
                                    
                                    
                                    </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Country</div>
                                <div className="register-form-right">
                                    
    
                                <select  name="country"
                value={formData.country}
                onChange={handleChange}> 
                      <option>Please Select</option>
                      <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas, The">Bahamas, The</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Virgin Islands">British Virgin Islands</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, Dem. Rep. of the">Congo, Dem. Rep. of the</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia, the">Gambia, the</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey and Alderney">Guernsey and Alderney</option>
                            <option value="Guiana, French">Guiana, French</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guinea, Equatorial">Guinea, Equatorial</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong, (China)">Hong Kong, (China)</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Ivory Coast (Cote d'Ivoire)">Ivory Coast (Cote d'Ivoire)</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Korea Dem. People's Rep.">Korea Dem. People's Rep.</option>
                            <option value="Korea, (South) Republic of">Korea, (South) Republic of</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democ. Rep.">Lao People's Democ. Rep.</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macedonia, TFYR">Macedonia, TFYR</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Man, Isle of">Man, Isle of</option>
                            <option value="Martinique (FR)">Martinique (FR)</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte (FR)">Mayotte (FR)</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Fed. States of">Micronesia, Fed. States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (ex-Burma)">Myanmar (ex-Burma)</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion (FR)">Reunion (FR)</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia (Russian Fed.)">Russia (Russian Fed.)</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy (FR)">Saint Barthelemy (FR)</option>
                            <option value="Saint Martin (FR)">Saint Martin (FR)</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Rep. of">Tanzania, United Rep. of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Is.">Turks and Caicos Is.</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                      
                      </select>

                      {errors.country && <p className='mt-0 text-danger'>{errors.country}</p>}            
                                        
                                        </div>





                                                         
                             
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Email</div>
                                <div className="register-form-right">
                                   
                                   
                                <input type="text" name="email" value={formData.email} onChange={handleChange} /> 
                                {errors.email && <p className='mt-0 text-danger'>{errors.email}</p>}
                                    
                                    </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Phone</div>
                                <div className="register-form-right">
                                
                              <input type="text" name="phone" value={formData.phone} onChange={handleChange} /> 
                              {errors.phone && <p className='mt-0 text-danger'>{errors.phone}</p>}
                                    
                                    </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">Message</div>
                                <div className="register-form-right">
                                    
                                
                                    <textarea type="text" name="message" value={formData.message} onChange={handleChange} > </textarea>
                                    {errors.message && <p className='mt-0 text-danger'>{errors.message}</p>}
                                    
                                    
                                    </div>
                              </div>
                              <div className="register-form-row">
                                <div className="register-form-left">&nbsp;</div>
                                <div className="register-form-right checkbox-section">
                                    
                                    <input type="checkbox" name="copy"  />Send a copy to yourself</div>
                              </div>          
                              <div className="register-form-row">
                                <div className="register-form-left">&nbsp;</div>
                                <div className="register-form-right">
                                    
                                
     <button type='submit' className='btn btn-success btn-sm' disabled={isSubmitting}>
                              {isSubmitting ? 'Submitting...' : 'Submit'}</button>
                                    
                                    </div>
                              </div>   
                              
                            </div>  
                            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
