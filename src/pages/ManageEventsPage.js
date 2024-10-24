import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/styles/ManageEventsPage.css';

const ManageEventsPage = () => {
  const { events, editEvent, deleteEvent } = useContext(EventContext);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log('User object:', user);
    console.log('All Events:', events);
  }, [user, events]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>You must be logged in to manage your events.</div>;
  }

  const userEvents = events.filter(event => event.userId === user.sub);
  console.log('User Events:', userEvents);

  const handleEditClick = (event) => {
    console.log('Editing event:', event);
    setEditingEvent({ ...event });
  };

  const handleSaveEdit = () => {
    console.log('Saving edited event:', editingEvent);
    editEvent({ ...editingEvent });
    setEditingEvent(null);
  };

  const handleCancelEdit = () => {
    console.log('Cancelling edit for event:', editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete button clicked for event with id: ${id}`);
    deleteEvent(id);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return adjustedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="manage-events-container">
      <h2>Manage Your Events</h2>
      {userEvents.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        <ul className="event-list">
          {userEvents.map((event) => (
            <li key={event.id} className="event-item">
              {editingEvent && editingEvent.id === event.id ? (
                <div className="edit-event-form">
                  <h3>Edit Event</h3>
                  <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                      type="text"
                      id="title"
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      value={editingEvent.date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        setEditingEvent({ ...editingEvent, date: newDate });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={editingEvent.startTime}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, startTime: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={editingEvent.endTime}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, endTime: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={editingEvent.location}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Event Description</label>
                    <textarea
                      id="description"
                      value={editingEvent.description}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group image-upload-group">
                    <label htmlFor="edit-image">Event Image</label>
                    <input
                      type="file"
                      id="edit-image"
                      name="image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingEvent({ ...editingEvent, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {editingEvent.image && (
                      <div className="image-preview">
                        <img src={editingEvent.image} alt="Event Preview" />
                      </div>
                    )}
                  </div>
                  <button className="save-edit-button" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button className="cancel-edit-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="event-details">
                  {event.image && (
                    <img src={event.image} alt={event.title} className="event-image" />
                  )}
                  <h3>{event.title}</h3>
                  <p><strong>Date:</strong> {formatDate(event.date)}</p>
                  <p><strong>Start Time:</strong> {formatTime(event.startTime)}</p>
                  <p><strong>End Time:</strong> {formatTime(event.endTime)}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p>{event.description}</p>
                  <div className="event-actions">
                    <button className="edit-button" onClick={() => handleEditClick(event)}>
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageEventsPage;