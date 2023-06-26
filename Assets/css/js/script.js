

$(document).ready(function () {
  // Setting my date format (was having heaps of trouble trying to use advanced format so I couldnt get the ordinal unfortunately)
  currentTime = document.getElementById("currentDay");
  currentTime.textContent = dayjs().format("dddd, MMMM D");

  // Function that pulls the number from my id names and compares it with current time.
  // It then adds past, present, future css classes depending on the logic of the number.
  $(".time-block").each(function () {
    var timeBlock = $(this);
    var time = timeBlock.attr("id");
    var timeFormat = dayjs().format("H");
    var timeNumber = parseInt(time.split("-")[1]);
    var textarea = timeBlock.find("textarea");

    if (timeNumber < timeFormat) {
      textarea.addClass("past");
      console.log("out of time");
    } else if (timeNumber == timeFormat) {
      textarea.addClass("present");
    } else if (timeNumber > timeFormat) {
      textarea.addClass("future");
    }
  });

  // Function that handles the events of when I click the save button.
  $("button.saveBtn").click(function () {
    // Retrieves my inputs
    var textareaId = $(this).closest(".time-block").attr("id");
    var textareaValue = $(this).closest(".time-block").find("textarea").val();

    // Function that creates a confirmation when an event is added, jquery animate added to scroll up to the message bubble.
    function showAppointmentEvent() {
      var appointmentCall = $("#appointmentAdded")
        .text(`Appointment added to localStorage ✔`)
        .show();
      setTimeout(function () {
        appointmentCall.text("").hide();
      }, 3000);

      $("html, body").animate(
        {
          scrollTop: appointmentCall.offset().top,
        },
        500
      );
    }
    showAppointmentEvent();

    // Sets my inputs to local storage.
    localStorage.setItem(textareaId, textareaValue);

    // Checked to see if it was saving in localStorage (was having issues).
    console.log(localStorage.getItem(textareaId));
  });

  // Function that retrieved my local storage and applied it in the correct container.
  $(".time-block").each(function () {
    var textareaId = $(this).attr("id");
    var storedValue = localStorage.getItem(textareaId);
    if (storedValue) {
      $(this).find("textarea").val(storedValue);
    }
  });
});
