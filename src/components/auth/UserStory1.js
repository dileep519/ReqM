import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const UserStory1 = () => {
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    want:'',
    soThat:'',
  });

  const { title,role ,want,soThat} = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <Fragment>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='container has-box'>
          <div className='form-group'>
            <h2 >User Story role</h2>
            <b>Story Title</b>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              className='inpt-box'
            />
          </div>
          <div className='form-group'>
            <b>As a</b>
            <input
              type='text'
              name='role'
              value={role}
              onChange={(e) => onChange(e)}
              className='inpt-box'
            />
          </div>
        </div>
        <div className='container has-box'>
          <div className='form-group'>
            <h2 >Action to Be Done</h2>
            <b>I Want To</b>
            <input
              type='text'
              name='want'
              value={want}
              onChange={(e) => onChange(e)}
              className='inpt-box'
            />
          </div>
          <div className='form-group'>
            <b>So That</b>
            <input
              type='text'
              name='soThat'
              value={soThat}
              onChange={(e) => onChange(e)}
              className='inpt-box'
            />
          </div>
        </div>
        <div className='container'>
          <input type='submit' className='btn btn-primary ' value='Next' />
        </div>
      </form>
    </Fragment>
  );
};

export default UserStory1;
