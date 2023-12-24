let notifications = []; // This should be replaced with actual data fetching

// Fetch notifications from the server
fetch('/api/notifications')
  .then(response => response.json())
  .then(data => {
    notifications = data.map(notification => ({...notification, read: false})); // Add read property
    displayNotifications();
  })
  .catch(error => {
    console.error('Error fetching notifications:', error);
  });

document.getElementById('delete-all').addEventListener('click', function() {
    notifications = [];
    displayNotifications();
});

document.getElementById('filter-type').addEventListener('change', function() {
    displayNotifications();
});

document.getElementById('filter-date').addEventListener('change', function() {
    displayNotifications();
});

function displayNotifications() {
    const type = document.getElementById('filter-type').value;
    const dateOrder = document.getElementById('filter-date').value;
    
    let filteredNotifications = notifications;
    
    if (type) {
        filteredNotifications = filteredNotifications.filter(n => n.type === type);
    }
    
    if (dateOrder === 'desc') {
        filteredNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        filteredNotifications.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    const notificationsDisplay = document.getElementById('notifications-display');
    notificationsDisplay.innerHTML = '';
    
    filteredNotifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = notification.id;
        notificationElement.appendChild(checkbox);
        notificationElement.textContent = notification.message;
        notificationsDisplay.appendChild(notificationElement);
    });
}

function markAsRead() {
  notifications.forEach(notification => {
    const checkbox = document.getElementById(notification.id);
    if (checkbox.checked) {
      notification.read = true;
    }
  });
  displayNotifications();
}

function deleteSelected() {
  notifications = notifications.filter(notification => {
    const checkbox = document.getElementById(notification.id);
    return !checkbox.checked;
  });
  displayNotifications();
}

document.getElementById('mark-as-read').addEventListener('click', markAsRead);
document.getElementById('delete-selected').addEventListener('click', deleteSelected);
