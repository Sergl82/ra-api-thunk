import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEditField,
  clearForm,
  editServicesRequest,
  fetchGetEditServices,
  fetchPostEditServices,
} from '../actions/actionCreators';
import Loader from './Loader';

export default function ServiceEdit() {
  const { item, loading, error } = useSelector((state) => state.serviceEdit);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetEditServices(params.id));
  }, [dispatch, params.id]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeEditField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!item.name || !item.price || item.price <= 0) return;
    dispatch(editServicesRequest());
    dispatch(fetchPostEditServices(navigate));
  };

  const handleReset = (evt) => {
    dispatch(clearForm());
    navigate('/');
  };

  return (
    (loading && <Loader />) ||
    error || (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h3>Edit service:</h3>
        <label>
          Name <input name="name" onChange={handleChange} value={item.name} />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            onChange={handleChange}
            value={item.price}
          />
        </label>
        <label>
          Content
          <input name="content" onChange={handleChange} value={item.content} />
        </label>
        <button
          type="submit"
          disabled={loading || !item.name || !item.price || item.price <= 0}
        >
          Save
        </button>
        <button type="reset" disabled={loading}>
          Close
        </button>
        <div>{error}</div>
      </form>
    )
  );
}
