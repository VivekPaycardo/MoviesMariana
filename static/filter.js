// static/js/filter.js
$(document).ready(function() {
  // Initialize the Genre filter multi-select dropdown using select2
  $('#genre-filter').select2({
    placeholder: 'All Genres', // Default text when nothing is selected
    allowClear: true, // Allow clearing the selection
  });

  // Function to handle Genre filter
  $('#genre-filter').on('change', function() {
    var selectedGenres = $(this).val();

    // Show all movies if 'All Genres' is selected or no genre is selected
    if (selectedGenres === null || selectedGenres.includes('all')) {
      $('#example tbody tr').show();
    } else {
      // Hide movies that do not match selected genre(s)
      $('#example tbody tr').each(function() {
        var movieGenres = $(this).find('.genre-cell').text().split(', ');
        var match = selectedGenres.some(function(genre) {
          return movieGenres.includes(genre);
        });

        if (match) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });

  // Show all movies initially when the page loads
  $('#genre-filter').val('all').trigger('change');
});
