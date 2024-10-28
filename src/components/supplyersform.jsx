import React, { useEffect, useState, useRef, useContext } from 'react';
import axiosInstance from '../axios/locationaxiosinstance'
import common    from '../axios/axiosinstance'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/context';


const SupplierForm = () => {

/**requiring */
const navigate= useNavigate()

const {setLoadingValue} = useContext(MyContext)

/**initialize form */
  const [formData, setFormData] = useState({
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
  });

  
  /**usestate */
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef(null); 
  const [supplierCount,setSupplierCount] =useState(0)
  
  /**use effect */
  useEffect(() => {
   const handleClickOutside = (event) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
       setShowDropdown(false); 
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [dropdownRef]);

  /**use effect */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get('/all'); 
        const countryNames = response.data.map(country => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
    fetchCount();
  }, []);



  const fetchCount=async()=>{
        try{
            const res = await common.get('/supplier/totalcount')
            console.log(res);
            setSupplierCount(res.data.count)
        }
        catch(err){
            console.log(err);
            
        }
    
  }


  /**change when input value change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  /**handle submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if(formData.supplierName !='' && formData.address != '' && formData.taxNo != ''&& formData.country != ''&& formData.mobileNo != ''&& formData.email != ''){
            setLoadingValue(true)
            const data={...formData,supplierNo:supplierCount+1}
            const response = await common.post('/supplier', data)
            if(response.data.status){
               console.log(response.data);
               alert('userAddedSuccessfully')  
               navigate('/')
            } else{
               console.log(response.data);
            }
            setLoadingValue(false)
        } else{
            alert('fill the form')
        }  
    }
    catch(err){
        setLoadingValue(false)
        console.log(err);
    }


  };


  /**coutrie filtering */
  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );


  /**hadle country select */
  const handleCountrySelect = (country) => {
    setFormData({
      ...formData,
      country,
    });
    setSearchQuery(country);
    setShowDropdown(false); 
  };


 

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md my-8 md:w-auto w-[80%]">

        <div className="flex justify-between items-center">
            <h1 className='font-bold'>Supplie No  <span className='text-[red]'>{supplierCount+1001}</span></h1>
            <h2 className="text-2xl font-semibold mb-4">Supplier Details</h2>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">TAX No</label>
          <input
            type="text"
            name="taxNo"
            value={formData.taxNo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4 relative" ref={dropdownRef}>
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            placeholder="Search for a country"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true); 
            }}
            onFocus={() => {
                setShowDropdown(true);
            }} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
            required
          />
          {showDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1 w-full max-h-60 overflow-y-auto">
              {filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleCountrySelect(country)}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile No</label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;
