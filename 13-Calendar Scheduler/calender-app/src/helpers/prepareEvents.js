import moment from 'moment';

export const prepareEvents = (events = []) => {
  return events.map((event) => ({
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate(),
  }));
};
