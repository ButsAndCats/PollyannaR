const concrete = {};
// Collection template sorting
concrete.getUrlParameterByName = function (parameter) {
  let url = decodeURIComponent(window.location.search.substring(1)),
    urlVariables = url.split('&'),
    parameterName;

  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split('=');
    if (parameterName[0] === parameter) {
      return parameterName[1] === undefined ? true : parameterName[1];
    }
  }
};


$(document).ready(() => {
  const selectedReasons = [];
  const goal = concrete.getUrlParameterByName('goal');
  const milestones = [];

  $(document).on('click', '.reason', function () {
    if (selectedReasons.length < 5) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        var reason = $(this).data('reason');
        const index = selectedReasons.indexOf(reason);
        selectedReasons.splice(index, 1);
      } else {
        $(this).addClass('active');
        var reason = $(this).data('reason');
        selectedReasons.push(reason);
      }
      if (selectedReasons.length === 5) {
        $('#addReasons').prop('disabled', false);
      } else {
        $('#addReasons').prop('disabled', true);
      }
    }
  });

  $(document).on('click', '#addReasons', () => {
    const data = {};
    data.reasons = selectedReasons;
    data.goal = goal;

    console.log(data);
    $.ajax({
      url: '/goals/edit',
      type: 'POST',
      data,
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
      success(data) {
        console.log('success');
        window.location.href = `/goals/when?goal=${goal}`;
      }
    });
  });

  $(document).on('click', '#addDate', () => {
    const measurement = $('#timeMeasurement').val();
    const value = Number($('#timeValue').val());
    const endDate = new Date();

    if (measurement === 'day') {
      endDate.setDate(endDate.getDate() + value);
    } else if (measurement === 'month') {
      endDate.setMonth(endDate.getMonth() + value);
    } else if (measurement === 'year') {
      endDate.setFullYear(endDate.getFullYear() + value);
    }
    const dd = endDate.getDate();
    const mm = endDate.getMonth() + 1;
    const y = endDate.getFullYear();

    const endDateString = `${dd}/${mm}/${y}`;
    console.log(endDateString);
    const data = {};
    data.goal = goal;
    data.endDate = endDateString;

    $.ajax({
      url: '/goals/edit',
      type: 'POST',
      data,
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
      success(data) {
        console.log('success');
        window.location.href = `/goals/complete?goal=${goal}`;
      }
    });
  });

  $(document).on('click', '#report', () => {
    $.ajax({
      url: 'goals/report',
      type: 'POST',
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
      success(data){
        //TODO: add download func
        console.log(data);
      }
    })
  })

});
