import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGetServices,
  fetchRemoveService,
} from '../actions/actionCreators';
import ServiceAdd from './ServiceAdd';
import ServiceFilter from './ServiceFilter';
import Loader from './Loader';

export default function ServiceList() {
  const { services, activeFilter, loading, error } = useSelector(
    (state) => state.serviceList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetServices());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(fetchRemoveService(id));
  };

  const handleEdit = (id) => {
    if (id) navigate('/services/' + id);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(activeFilter.toLowerCase())
  );
  const items = filteredServices.length ? filteredServices : services;
  const itemsList = items.map((o) => (
    <li key={o.id}>
      {o.name} {o.price}
      <button disabled={o.loading} onClick={() => handleEdit(o.id)}>
        ✎
      </button>
      <button disabled={o.loading} onClick={() => handleRemove(o.id)}>
        ✕
      </button>
    </li>
  ));

  return (
    <>
      <ServiceAdd />
      <ServiceFilter />
      {(loading && <Loader />) || error || (
        <ul>
          {!filteredServices.length && activeFilter
            ? 'Nothing to display. Try another filter string!'
            : itemsList}
        </ul>
      )}
    </>
  );
}
