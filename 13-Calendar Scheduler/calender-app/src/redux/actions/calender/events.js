import Swal from 'sweetalert2';
import { fetchWithToken } from '../../../helpers/fetch';
import { prepareEvents } from '../../../helpers/prepareEvents';
import { types } from '../../types/types';

export const startAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const eventAddNew = (e) => ({
  type: types.eventAddNew,
  payload: e,
});

export const eventSetActive = (e) => ({
  type: types.eventSetActive,
  payload: e,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const eventUpdated = (e) => ({
  type: types.eventUpdated,
  payload: e,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calender.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events');
      const body = await resp.json();

      const events = prepareEvents(body.events);

      dispatch(eventLoaded(events));
    } catch (err) {
      console.log(err);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
