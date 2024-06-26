import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    lecId: '',
    role: '2',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      password: name === 'lecId' ? value : formData.password,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.lecId) {
      newErrors.lecId = 'Lecturer Id is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validate();

      await axios.post('/add/emp', formData);

      alert('New Project Manager added Successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        lecId: '',
        role: '2',
      });
      setErrors({});
      window.location.href = "/Emp";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
          <h1 className="h3 mb-3 font-weight-normal text-center">Add new Project Member</h1>
<div className='flex item-center justify-center'>
    <div className="bg-gray-500 w-8/12">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <form className="needs-validation" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label style={{ marginBottom: '10px', display: 'block' }}>Name</label>
                <input
                  type="text"
                  className={` rounded-md form-control text-zinc-950 ${errors.name && 'is-invalid'}`}
                  name="name"
                  placeholder="Enter First Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label style={{ marginBottom: '10px', display: 'block' }}>Email</label>
                <input
                  type="email"
                  className={` rounded-md form-control text-zinc-950 ${errors.email && 'is-invalid'}`}
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label style={{ marginBottom: '10px', display: 'block' }}>Lec Id</label>
                <input
                  type="text"
                  className={`rounded-md form-control text-zinc-950 ${errors.lecId && 'is-invalid'}`}
                  name="lecId"
                  placeholder="Enter Lecturer Id"
                  value={formData.lecId}
                  onChange={handleInputChange}
                />
                {errors.lecId && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {errors.lecId}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label style={{ marginBottom: '10px', display: 'block' }}>Password</label>
                <input
                  type="password"
                  className={` rounded-md form-control text-zinc-950 ${errors.password && 'is-invalid'}`}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-2 mb-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Form;
