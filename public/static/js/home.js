// Titleclick
$(`.typewriter`).on('click', () => {
  window.location.href = '/signIn';
})
// Login Page Controller
var working = false;
$('#login').on('submit', function (e) {
  e.preventDefault();
  if (working) return;
  working = true;
  var $this = $(this),
  $state = $this.find('button > .state');
  $this.addClass('loading');

  // Add a JSON call to create/session
  $.ajax({
    type: 'POST',
    url: '/signIn',
    data: $(this).serialize(),
    success: function (response) {
      if (response.success) {
        $this.removeClass('loading');
        working = false;
        document.getElementById('login').reset()
        alert(response.message);
        $state.html('Log in');
        // window.location.href = '/home/employee';
      } else {
        working = false;
        $this.removeClass('loading');
        document.getElementById('login').reset()
      }
    },
    error: function (xhr, status, error) {
      $this.removeClass('loading');
      working = false;
      document.getElementById('login').reset()
      $state.html('Log in');
      let response = JSON.parse(xhr.responseText);
      alert(response.error);
    }
  })
})
var resetFormWorking = false;
$('#forgotPassword').on('submit', function (e) {
  e.preventDefault();
  if (resetFormWorking) return;
  resetFormWorking = true;
  var $this = $(this),
  $state = $this.find('button > .state');
  $this.addClass('loading');

  $.ajax({
    type: 'POST',
    url: '/forgotPassword',
    data: $(this).serialize(),
    success: function (response) {
      if (response.success) {
        $this.removeClass('loading');
        resetFormWorking = false;
        document.getElementById('forgotPassword').reset()
        alert(response.message);
        $state.html('Reset');
        window.location.href = '/signIn';
      } else {
        resetFormWorking = false;
        $this.removeClass('loading');
        document.getElementById('forgotPassword').reset()
      }
    },
    error: function (xhr, status, error) {
      $this.removeClass('loading');
      resetFormWorking = false;
      document.getElementById('forgotPassword').reset();
      $state.html('Reset');
      let response = JSON.parse(xhr.responseText);
      alert(response.error);
    }
  })
})