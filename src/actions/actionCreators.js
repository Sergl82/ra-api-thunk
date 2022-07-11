import {
  REMOVE_SERVICE,
  FILTER_SERVICE,
  CHANGE_ADD_FIELD,
  CHANGE_EDIT_FIELD,
  CHANGE_FILTER_FIELD,
  CLEAR_FORM,
  CLEAR_FILTER,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
  FETCH_SERVICES_REQUEST,
  ADD_SERVICES_SUCCESS,
  ADD_SERVICES_FAILED,
  ADD_SERVICES_REQUEST,
  EDIT_SERVICES_SUCCESS,
  EDIT_SERVICES_FAILED,
  EDIT_SERVICES_REQUEST,
} from './actionTypes';

export function removeService(id) {
  return { type: REMOVE_SERVICE, payload: { id } };
}

export function filterService(setFilter) {
  return { type: FILTER_SERVICE, payload: { setFilter } };
}

export function changeAddField(name, value) {
  return { type: CHANGE_ADD_FIELD, payload: { name, value } };
}

export function changeEditField(name, value) {
  return { type: CHANGE_EDIT_FIELD, payload: { name, value } };
}

export function changeFilterField(filter) {
  return { type: CHANGE_FILTER_FIELD, payload: { filter } };
}

export function clearForm() {
  return { type: CLEAR_FORM };
}

export function clearFilter() {
  return { type: CLEAR_FILTER };
}

export function fetchServicesRequest() {
  return { type: FETCH_SERVICES_REQUEST };
}

export function fetchServicesSuccess(services) {
  return { type: FETCH_SERVICES_SUCCESS, payload: { services } };
}

export function fetchServicesFailed(error) {
  return { type: FETCH_SERVICES_FAILED, payload: { error } };
}

export function addServicesRequest() {
  return { type: ADD_SERVICES_REQUEST };
}

export function addServicesSuccess() {
  return { type: ADD_SERVICES_SUCCESS };
}

export function addServicesFailed(error) {
  return { type: ADD_SERVICES_FAILED, payload: { error } };
}

export function editServicesRequest() {
  return { type: EDIT_SERVICES_REQUEST };
}

export function editServicesSuccess(item) {
  return { type: EDIT_SERVICES_SUCCESS, payload: { item } };
}

export function editServicesFailed(error) {
  return { type: EDIT_SERVICES_FAILED, payload: { error } };
}

export const fetchGetServices = () => (dispatch) => {
  dispatch(fetchServicesRequest());
  return fetch(process.env.REACT_APP_API_URL_BUILD)
    .then((response) => {
      console.log('fetchGetServices_response: ', response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      return response.json();
    })
    .then((result) => {
      console.log('fetchGetServices_result: ', result);
      dispatch(fetchServicesSuccess(result));
    })
    .catch((e) => {
      console.log('fetchServices_Get_Error_text: ', e.message);
      dispatch(fetchServicesFailed(e.message));
    });
};

export const fetchRemoveService = (id) => (dispatch) => {
  dispatch(removeService(id));
  return fetch(process.env.REACT_APP_API_URL_BUILD + '/' + id, {
    method: 'DELETE',
  })
    .then((response) => {
      console.log('fetchDeleteService_response: ', response);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      dispatch(fetchGetServices());
    })
    .catch((e) => {
      console.log('fetchDeleteServicet_Error_text: ', e.message);
      dispatch(fetchServicesFailed(e.message));
    });
};

export const fetchPostServices = () => (dispatch, getState) => {
  const {
    serviceAdd: { item },
  } = getState();
  console.log('fetchServices_item: ', item);
  dispatch(addServicesRequest());
  return fetch(process.env.REACT_APP_API_URL_BUILD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...item, id: 0 }),
  })
    .then((result) => {
      console.log(result);
      if (!result.ok) {
        console.log(
          'ServiceForm_handleSubmit_fetchServices_result:',
          result.status,
          result.statusText
        );
      }
      if (result.status < 200 || result.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      dispatch(addServicesSuccess());
      dispatch(fetchGetServices());
    })
    .catch((e) => {
      console.log(
        'ServiceForm_handleSubmit_fetchServices_Error_text: ',
        e.message
      );
      dispatch(addServicesFailed(e.message));
    });
};

export const fetchPostEditServices = (navigate) => (dispatch, getState) => {
  const {
    serviceEdit: { item },
  } = getState();
  console.log('fetchPostEditServices_item: ', item);
  return fetch(process.env.REACT_APP_API_URL_BUILD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...item }),
  })
    .then((result) => {
      console.log(result);
      if (!result.ok) {
        console.log(
          'ServiceForm_handleSubmit_fetchServices_result.statusText:',
          result.status,
          result.statusText
        );
      }
      if (result.status < 200 || result.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      dispatch(editServicesSuccess());
      navigate('/');
    })
    .catch((e) => {
      console.log(
        'ServiceForm_handleSubmit_fetchServices_Error_text: ',
        e.message
      );
      dispatch(editServicesFailed(e.message));
    });
};

export const fetchGetEditServices = (id) => (dispatch) => {
  dispatch(editServicesRequest());
  return fetch(process.env.REACT_APP_API_URL_BUILD + '/' + id)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Произошла ошибка.');
      }
      return response.json();
    })
    .then((result) => {
      dispatch(editServicesSuccess(result));
    })
    .catch((e) => {
      console.log('fetchServices_Get_Error_text: ', e.message);
      dispatch(editServicesFailed(e.message));
    });
};
