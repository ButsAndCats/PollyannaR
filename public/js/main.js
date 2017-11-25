var concrete = {};
// Collection template sorting
concrete.getUrlParameterByName = function(parameter) {
  var url = decodeURIComponent(window.location.search.substring(1)),
      urlVariables = url.split('&'),
      parameterName;

  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split('=');
    if (parameterName[0] === parameter) {
      return parameterName[1] === undefined ? true : parameterName[1];
    }
  }
};


$(document).ready(function() {

  var selectedReasons = [];
  var goal = concrete.getUrlParameterByName('goal');

  $(document).on('click', '.reason', function(){
    if(selectedReasons.length < 5) {
      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        var reason = $(this).data('reason');
        var index = selectedReasons.indexOf(reason);
        selectedReasons.splice(index, 1);

      } else {
        $(this).addClass('active');
        var reason = $(this).data('reason');
        selectedReasons.push(reason);
      }
      if(selectedReasons.length === 5) {
        $('#addReasons').prop('disabled', false);
      } else {
        $('#addReasons').prop('disabled', true);
      }
    }
  })

  $(document).on('click', '#addReasons', function() {
    var data = {};
    data.reasons = selectedReasons;
    data.goal = goal;

    console.log(data)
    $.ajax({
      url: '/goals/edit',
      type: 'POST',
      data: data,
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      success: function(data){
        console.log('success')
        window.location.href = '/goals/when?goal='+goal;
      }
    });
  });

  $(document).on('click', '#addDate', function(){
    var measurement = $('#timeMeasurement').val();
    var value = Number($('#timeValue').val());
    var endDate = new Date();

    if(measurement === 'day' ) {
      endDate.setDate(endDate.getDate() + value);
    } else if(measurement === 'month') {
      endDate.setMonth(endDate.getMonth() + value);
    } else if(measurement === 'year') {
      endDate.setFullYear(endDate.getFullYear() + value);
    }
    var dd = endDate.getDate();
    var mm = endDate.getMonth() + 1;
    var y = endDate.getFullYear();

    var endDateString = dd + '/'+ mm + '/'+ y;
    console.log(endDateString)
    var data = {};
    data.goal = goal;
    data.endDate = endDateString;

    $.ajax({
      url: '/goals/edit',
      type: 'POST',
      data: data,
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      success: function(data){
        console.log('success')
        window.location.href = '/goals/complete?goal='+goal;
      }
    });
  })
});
