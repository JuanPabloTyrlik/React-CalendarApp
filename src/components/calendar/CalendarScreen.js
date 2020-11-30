import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiModalOpen } from '../../actions/ui';
import {
    eventClearActive,
    eventSetActive,
    eventStartLoadingEvents,
} from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { uid } = useSelector((state) => state.auth);

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        return {
            style,
        };
    };

    const onDoubleClick = () => {
        dispatch(uiModalOpen());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        dispatch(eventClearActive());
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const onSelectSlot = () => {
        dispatch(eventClearActive());
    };

    useEffect(() => {
        dispatch(eventStartLoadingEvents());
    }, [dispatch]);

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
            />
            {activeEvent && <DeleteFab />}
            <AddNewFab />
            <CalendarModal />
        </div>
    );
};
