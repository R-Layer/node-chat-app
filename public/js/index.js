const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  const template = jQuery('#message-template').html();
  let formattedTime = moment(message.createdAt).format('h:mm a');

  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  const template = jQuery('#location-message-template').html();
  let formattedTime = moment(message.createdAt).format('h:mm a');

  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

const locationButton = jQuery('#send-location').removeAttr('disabled');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  };

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
  locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  }, {timeout:5000});
});
