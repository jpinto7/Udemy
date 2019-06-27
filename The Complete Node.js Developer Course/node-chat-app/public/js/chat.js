var socket = io();

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

(function($) {
  var $messageTextbox = $('[name=message]');
  var $locationButton = $('#send-location');
  var $messages = $('#messages');

  function scrollToBottom() {
    var $newMessage = $messages.children('li:last-child');
    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = $newMessage.innerHeight();
    var lastMessageHeight = $newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      $messages.scrollTop(scrollHeight);
    }
  }

  socket.on('connect', function() {
    console.log('Connected to server');
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('No error');
      }
    });
  });

  socket.on('updateUserList', function(users) {
    const ol = $('<ol></ol>');
    users.forEach(function(user) {
      ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
  });

  socket.on('newMessage', function(message) {
    var template = $('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    $messages.append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', function(message) {
    var template = $('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
      url: message.url,
      from: message.from,
      createdAt: formattedTime
    });
    $messages.append(html);
    scrollToBottom();
  });

  $(function() {
    $('#message-form').on('submit', function(e) {
      e.preventDefault();
      socket.emit('createMessage', {
        text: $messageTextbox.val()
      }, function() {
        $messageTextbox.val('');
      });
    });

    $locationButton.on('click', function(e) {
      if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
      }
      $locationButton.attr('disabled', 'disabled').text('Sending location...');
      navigator.geolocation.getCurrentPosition(function(position) {
        $locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function() {
        $locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
      });
    });
  });
})(jQuery);