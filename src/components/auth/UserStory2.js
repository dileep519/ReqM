import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const UserStory2 = () => {
  const [formData, setFormData] = useState({
    assignTo: '',
    details: '',
    watchlist: '',
    providedBy: '',
    mode: '',
    priority: '',
  });

  const { assignTo, details, watchlist, providedBy, mode, priority } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='container has-box'>
          <div className='form-group'>
            <b>Assign To</b>
            <input
              type='text'
              name='assignTo'
              value={assignTo}
              onChange={(e) => onChange(e)}
              className='inpt-box'
              required
            />
          </div>
          <div className='form-group'>
            <b>Additional Details</b>
            <input
              type='text'
              name='details'
              value={details}
              onChange={(e) => onChange(e)}
              className='inpt-box'
              required
            />
          </div>
          <input type='checkbox' name='watchlist' value={watchlist} />
          <span> Add to watchlist </span>
        </div>
        <div className='container has-box'>
          <div className='form-group'>
            <b>Provide By</b>
            <input
              type='text'
              name='providedBy'
              value={providedBy}
              onChange={(e) => onChange(e)}
              required
              className='inpt-box'
            />
          </div>
          <div className='form-group'>
            <b>Mode</b>
            <input
              type='text'
              name='mode'
              value={mode}
              onChange={(e) => onChange(e)}
              required
              className='inpt-box'
            />
            <br></br>
            <div>
              <b>Priority</b>
              <input type='radio' name='priority' />
              <b>High</b>
              <input type='radio' name='priority' />
              <b>Medium</b>
              <input type='radio' name='priority' />
              <b>Low</b>
            </div>
          </div>
        </div>
        <input type='submit' className='btn btn-primary ' value='Next' />
      </form>
    </Fragment>
  );
};

export default UserStory2;
