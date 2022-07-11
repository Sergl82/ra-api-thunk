import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeAddField,
  clearForm,
  fetchPostServices,
} from '../actions/actionCreators';

export default function ServiceAdd() {
  const { item, loading, error } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeAddField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!item.name || !item.price || item.price <= 0) return;
    dispatch(fetchPostServices());
  };

  const handleReset = (evt) => {
    dispatch(clearForm());
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h3>Add service:</h3>
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
      <button
        type="submit"
        disabled={loading || !item.name || !item.price || item.price <= 0}
      >
        Save
      </button>
      <button type="reset" disabled={loading}>
        Cancel
      </button>
      <div>{error}</div>
    </form>
  );
}
