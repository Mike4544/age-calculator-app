var dayInput = document.querySelector("#day-input");
var monthInput = document.querySelector("#month-input");
var yearInput = document.querySelector("#year-input");

var submitButton = document.querySelector("#calc-button");

var form = document.querySelector(".form-row");


function fieldError(field, errorMessage) {
    field.parentElement.classList.toggle('invalid');
    field.parentElement.setAttribute("errorMessage", errorMessage);
}

function fieldsClearErrors() {
    dayInput.parentElement.classList.remove('invalid');
    monthInput.parentElement.classList.remove('invalid');
    yearInput.parentElement.classList.remove('invalid');

    dayInput.parentElement.removeAttribute("errorMessage");
    monthInput.parentElement.removeAttribute("errorMessage");
    yearInput.parentElement.removeAttribute("errorMessage");
}


function validateDate() {
  var day = parseInt(dayInput.value);
  var month = parseInt(monthInput.value);
  var year = parseInt(yearInput.value);

  var isValid = true;
  fieldsClearErrors();

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    fieldError(dayInput, "Field cannot be empty");
    fieldError(monthInput, "Field cannot be empty");
    fieldError(yearInput, "Field cannot be empty");
    

    isValid = false;

    return isValid;
  }

  if (day > 31 || day < 1) {
    //  alert('Invalid day');
    //   return false;
    fieldError(dayInput, "Must be a valid day");
    isValid = false;
  }

  if (month > 12 || month < 1) {
    //  alert('Invalid month');
    //   return false;
    fieldError(monthInput, "Must be a valid month")
    isValid = false;
  }

  // Edge case for February
  if (month == 2) {
    var isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

    if (!isLeapYear && day > 28) {
      //  alert('Invalid day');
      //   return false;
      fieldError(monthInput, "Must be a valid month")
      isValid = false;
    }

    if (day > 29) {
      //  alert('Invalid day');
      //   return false;
      fieldError(monthInput, "Must be a valid month")
      isValid = false;
    }
  }

  var currentYear = new Date().getFullYear();

  if (year < 0 || year > currentYear) {
    //  alert('Invalid year');
    fieldError(yearInput, "Must be a valid year")
    isValid = false;
  }

  form.reportValidity();

  return isValid;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeSpans(span, value) {
    span.classList.toggle('changing');

    await sleep(1000);

    var originalText = span.innerHTML;

    for(var i = originalText.length; i > 0; i--) {
        span.innerHTML = originalText.substring(0, i);
        await sleep(250);
    }

    var newValue = value.toString();
    for(var i = 0; i <= newValue.length; i++) {
        span.innerHTML = newValue.substring(0, i);
        await sleep(250);
    }

    await sleep(1000);

    span.classList.toggle('changing');
}

function calculateDate() {
  var daySpan = document.querySelector(".days span");
  var monthSpan = document.querySelector(".months span");
  var yearSpan = document.querySelector(".years span");

  var day = dayInput.value;
  var month = monthInput.value;
  var year = yearInput.value;

  var currentDate = new Date();

  var currentDay = currentDate.getDate();
  var currentMonth = currentDate.getMonth() + 1;
  var currentYear = currentDate.getFullYear();

  changeSpans(daySpan, Math.abs(currentDay - day));
  changeSpans(monthSpan, Math.abs(currentMonth - month));
  changeSpans(yearSpan, Math.abs(currentYear - year));

}

submitButton.addEventListener("click", (event) => {
  if (validateDate()) {
    calculateDate();
  }
});
