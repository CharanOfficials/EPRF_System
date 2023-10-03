$('#dept_form').submit(function (event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/admin/department',
        data: $(this).serialize(), // To send form data
        success: function (response) {
        if (response.success) {
          alert(response.message);
          $('#dept_form')[0].reset();
        }
      },
        error: function (xhr, status, error) {
          let response = JSON.parse(xhr.responseText); 
          console.log(response)
          if (xhr.status === 409) {
              alert(response.error);
          } else if (xhr.status === 400) {
              alert(response.error)
          }
          else {
                alert('An error occurred');
          }
      }
    });
});
$('#posi_form').submit(function (event) {
  event.preventDefault();
  $.ajax({
      type: 'POST',
      url: '/admin/position',
      data: $(this).serialize(), // To send form data
      success: function (response) {
      if (response.success) {
        alert(response.message);
        $('#posi_form')[0].reset();
      }
    },
      error: function (xhr, status, error) {
        let response = JSON.parse(xhr.responseText);  
        if (xhr.status === 409) {
            alert(response.error);
        } else if (xhr.status === 400) {
            alert(response.error)
        } else if (xhr.status === 404) {
            alert(response.error)
        }
        else {
              alert(response.error);
        }
    }
  });
});
$('#add_emp_form').submit(function (event) {
  event.preventDefault();
  $.ajax({
      type: 'POST',
      url: '/signUp',
      data: $(this).serialize(), // To send form data
      success: function (response) {
      if (response.success) {
        alert(response.message);
        $('#add_emp_form')[0].reset();
      }
    },
      error: function (xhr, status, error) {
        let response = JSON.parse(xhr.responseText);  
        if (xhr.status === 409) {
            alert(response.error);
        } else if (xhr.status === 400) {
            alert(response.error)
        } else if (xhr.status === 404) {
            alert(response.error)
        }
        else {
              alert('An error occurred');
        }
    }
  });
});
$('#edit_emp_form').submit(function (event) {
  event.preventDefault();
  console.log("clicked")
  $.ajax({
      type: 'POST',
      url: '/admin/editemployee',
      data: $(this).serialize(), // To send form data
      success: function (response) {
      if (response.success) {
        alert(response.message);
        window.location.href = '/admin/employees';
      }
    },
      error: function (xhr, status, error) {
        let response = JSON.parse(xhr.responseText); 
        alert(response.error);

    }
  });
});
$(document).ready(function() {
  $('#dept').change(function() {
    const selectedDepartmentId = $(this).val();
    const positionSelect = $('#posi');
    // Clear previous options
    positionSelect.empty();

    // Send an AJAX request to fetch positions for the selected department
    $.ajax({
      type: 'GET',
      url: `/admin/getPositions?departmentId=${selectedDepartmentId}`, // Adjust the API endpoint
      success: function (positions) {
        // Populate position options from the AJAX response
        $.each(positions, function (index, position) {
          positionSelect.append($('<option>', {
            value: position._id,
            text: position.pos_name
          }));
        });
      },
      error: function(err) {
        console.error('Error fetching positions: ' + err);
      }
    });
  });
});