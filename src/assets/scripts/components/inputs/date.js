/* eslint-disable import/prefer-default-export */
/**
 * Date Picker Customization
 * * this will need multiple version, day, month, time, datelocal, date
 * No month input
 */

import GeneralFunctions from '../general-functions/general-functions';

export function DateInput() {
  const
    generalFunctions = new GeneralFunctions(),
    // Values  --------------------------------
    _setDateValue = (input, fauxInput, data) => {
      const
        monthNumber = parseInt(data[0], 10) + 1,
        month = monthNumber < 10 ? 0 + String(monthNumber) : String(monthNumber),
        day = data[1] < 10 ? 0 + data[1] : data[1],
        year = data[2],
        fauxValue = `${month}/${day}/${year}`,
        inputValue = `${year}-${month}-${day}`;

      fauxInput.innerHTML = fauxValue;
      input.value = inputValue;

      return { fauxValue, inputValue };
    },

    _setDateTimeValue = (input, fauxInput, data, time) => {
      const
        dateFormat = _setDateValue(input, fauxInput, data);

      fauxInput.innerHTML = `${dateFormat.fauxValue} ${time}`;
      input.value = `${dateFormat.inputValue}T${time}`;
    },

    _setWeekValue = (input, fauxInput, data) => {
      const
        week = data[0],
        year = data[1];
      fauxInput.innerHTML = `week ${week}, ${year}`;
      input.value = `week ${week}, ${year}`;
    },

    // Layout Creation --------------------------------
    // `td` setup ---
    _datetimeTDLayout = (dayCount, selectedClass, month, yearInput) => `
      <td class="aic-o-input-field__calendar-cell-${dayCount}"><button class="aic-o-button aic-o-button--flat aic-o-input-field__calendar-day ${selectedClass}" id="day-${dayCount}" data-day="${month}, ${dayCount}, ${yearInput}">${dayCount}</button></td>`,

    _calendarTDLayout = (dayCount, selectedClass, month, yearInput) => `
      <td class="aic-o-input-field__calendar-cell-${dayCount}"><button class="aic-o-button aic-o-button--flat aic-o-input-field__calendar-day ${selectedClass}" id="day-${dayCount}" data-day="${month}, ${dayCount}, ${yearInput}">${dayCount}</button></td>`,

    _weekButtonTDLayout = (weekNumber, year) => `
      <td class="aic-o-input-field__calendar-cell-${weekNumber}"><button class="aic-o-button aic-o-button--flat aic-o-input-field__calendar-week" id="week-${weekNumber}" data-week="${weekNumber}, ${year}">${weekNumber}</button></td>`,

    _weekTDLayout = dayCount => `
      <td class="aic-o-input-field__calendar-cell-${dayCount}" >${dayCount}</td>`,

    // Drop Down setup ---
    _yearDropDownLayout = (currentYear, yearSelect, yearInput) => {
      const $yearSelect = yearSelect;
      let selected;
      // Calendar Year Select
      $yearSelect.innerHTML = `<option value="${parseInt(currentYear, 10) + 1}">${parseInt(currentYear, 10) + 1}</option>`;

      for (let i = 0; i < 100; i++) {
        const dropDownYear = currentYear - i;

        // We want the current year to be selected on load
        if (yearInput === currentYear) {
          selected = (currentYear === dropDownYear) ? 'selected' : '';
        }
        // If you selected the year from the drop down
        else {
          selected = (parseInt(yearInput, 10) === dropDownYear) ? 'selected' : '';
        }

        $yearSelect.innerHTML += `<option value="${dropDownYear}" ${selected}>${dropDownYear}</option>`;
      }
    },

    // Calendar Layout ---
    _calendarHeaderLayout = (daysOfTheWeek, calendarHeader, typeOfInput) => {
      const $calendarHeader = calendarHeader;

      if (typeOfInput === 'week') {
        daysOfTheWeek.unshift('#');
      }

      for (let i = 0; i < daysOfTheWeek.length; i++) {
        $calendarHeader.innerHTML += `<th class='days-of-the-week'>${daysOfTheWeek[i]}</th>`;
      }
    },

    _calendarBodyLayout = ($container, firstDay, months, month, daysOfTheWeek, fauxInputDate, yearInput, lastDay, typeOfInput) => {
      const
        $calendarBody = $container,
        weeks = Math.round(lastDay.getDate() / 7);

      let
        dayCount = 1,
        howManyWeeks = ((month + 1) * (weeks)) + 1,
        offset = firstDay,
        selectedClass,
        weekType;

      // Calendar Body
      for (let i = 0; i <= weeks; i++) {
        weekType = typeOfInput === 'week' ? _weekButtonTDLayout(howManyWeeks, yearInput) : '';

        $calendarBody.innerHTML += `<tr class="aic-o-input-field__calendar-row" id="cell-${i}">${weekType}`;

        for (let d = 0; d < daysOfTheWeek.length; d++) {
          // If we change months then we want to make sure the selected class
          // stays on the correct input

          if (fauxInputDate !== '' && dayCount === parseInt(fauxInputDate[1], 10) && months[month] === months[fauxInputDate[0] - 1] && yearInput === fauxInputDate[2]) {
            selectedClass = 'aic-o-input-field__calendar-day--selected';
          }
          else {
            selectedClass = '';
          }

          if (offset === 0) {
            // we need to check what type of input. That way we can format properly
            if (typeOfInput === 'date') {
              $calendarBody.querySelector(`#cell-${i}`).innerHTML += _calendarTDLayout(dayCount, selectedClass, month, yearInput);
            }
            else if (typeOfInput === 'datetime-local') {
              $calendarBody.querySelector(`#cell-${i}`).innerHTML += _datetimeTDLayout(dayCount, selectedClass, month, yearInput);
            }
            else if (typeOfInput === 'week') {
              $calendarBody.querySelector(`#cell-${i}`).innerHTML += _weekTDLayout(dayCount);
            }

            if (dayCount >= lastDay.getDate()) {
              break;
            }
            dayCount += 1;
          }
          else {
            $calendarBody.querySelector('tr').innerHTML += '<td></td>';
            offset -= 1;
          }
        }
        $calendarBody.innerHTML += '</tr>';
        howManyWeeks += 1;
      }
    },

    _createCustomCalendar = ($container, month, yearInput, currentYear, typeOfInput) => {
      const
        $monthTitle = $container.querySelector('.aic-o-input-field__month'),
        $calendarHeader = $container.querySelector('.aic-o-input-field__calendar-table-head tr'),
        $calendarBody = $container.querySelector('.aic-o-input-field__calendar-table-body'),
        $yearSelect = $container.querySelector('.aic-o-input-field__calendar-select-year'),
        $fauxInput = $container.parentNode.querySelector('.aic-o-input-field__input'),
        fauxInputDate = $fauxInput.innerHTML !== '' ? $fauxInput.innerHTML.split('/') : '',
        monthsNameArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        firstDay = new Date(yearInput, month, 1),
        lastDay = new Date(yearInput, month + 1, 0);

      $monthTitle.innerHTML = monthsNameArray[month];

      // Make sure only date and datetime-local create this section
      if (typeOfInput === 'date' || typeOfInput === 'datetime-local') {
        _yearDropDownLayout(currentYear, $yearSelect, yearInput);
      }

      // Calendar Header
      $calendarHeader.innerHTML = '';

      _calendarHeaderLayout(daysOfTheWeek, $calendarHeader, typeOfInput);

      // Calendar Body
      $calendarBody.innerHTML = '';

      // This is to make sure if there the offset is too big that there area enough rows for the week
      _calendarBodyLayout($calendarBody, firstDay.getDay(), monthsNameArray, month, daysOfTheWeek, fauxInputDate, yearInput, lastDay, typeOfInput);
    },

    // The background will alow up the close the calendar when clicked outside
    _BGSetup = ($container) => {
      const
        $bgBody = document.createElement('div'),
        $bgLabel = document.createElement('div');
      document.body.append($bgBody);
      $container.parentNode.insertBefore($bgLabel, $container);
      $bgBody.classList.add('aic-o-input-field__calendar-bg');
      $bgLabel.classList.add('aic-o-input-field__calendar-bg');
    };

  // These are public functions---
  this.Close = () => {
    document.querySelectorAll('.aic-o-input-field__custom-calendar').forEach(($calendar) => {
      if ($calendar.classList.contains('aiu-display--block')) {
        $calendar.classList.remove('aiu-display--block');
      }

      if ($calendar.parentNode.querySelector('.aic-o-input-field__native').value === '') {
        $calendar.parentNode.querySelector('.aic-o-input-field__input-container').classList.remove('aic-o-input-field--focused');
      }
    });
    document.querySelectorAll('.aic-o-input-field__calendar-bg').forEach(($bg) => {
      $bg.remove();
    });
  };

  this.GetValue = (e) => {
    const
      $this = e.target,
      $calendar = !e.target.classList.contains('aic-o-input-field__time') ? $this.parentNode.parentNode.parentNode.parentNode.parentNode : $this.parentNode.parentNode.parentNode,
      id = $calendar.id,
      $container = document.querySelector(`[data-calendarid="${id}"]`),
      typeOfInput = !e.target.classList.contains('aic-o-input-field__time') ? $container.querySelector('.aic-o-input-field__native').getAttribute('type') : 'time';

    if (typeOfInput === 'datetime-local') {
      $calendar.querySelector('.aic-o-input-field__time').setAttribute('data-date', $this.dataset.day);
    }

    if (typeOfInput === 'week') {
      $this.parentNode.parentNode.classList.add('aic-o-input-field__calendar-row--selected');
    }
    else if (typeOfInput !== 'time') {
      $this.classList.add('aic-o-input-field__calendar--selected');
    }

    switch (typeOfInput) {
      case 'date':
        _setDateValue($container.querySelector('.aic-o-input-field__native'), $container.querySelector('.aic-o-input-field__input'), $this.dataset.day.split(', '));
        $container.classList.add('aic-o-input-field--focused');
        break;
      case 'time':
        _setDateTimeValue($container.querySelector('.aic-o-input-field__native'), $container.querySelector('.aic-o-input-field__input.aic-o-input-field__date'), $this.dataset.date.split(', '), $this.value);
        $container.classList.add('aic-o-input-field--focused');
        break;
      case 'week':
        _setWeekValue($container.querySelector('.aic-o-input-field__native'), $container.querySelector('.aic-o-input-field__input'), $this.dataset.week.split(', '));
        $container.classList.add('aic-o-input-field--focused');
        break;
      default:
        break;
    }

    if (typeOfInput !== 'datetime-local') {
      this.Close();
    }
  };

  this.SetUp = ($container) => {
    const
      $calendarContainer = document.getElementById($container.dataset.calendarid),
      $inputContainer = $container,
      // $dateLabel = $calendarContainer.querySelector('.aic-o-input-field__date-container'),
      $nextMonthButton = $calendarContainer.querySelector('.aic-o-input-field__calendar-next-month'),
      $prevMonthButton = $calendarContainer.querySelector('.aic-o-input-field__calendar-prev-month'),
      $typeOfInput = $inputContainer.querySelector('.aic-o-input-field__native').getAttribute('type'),
      $yearSelect = $calendarContainer.querySelector('.aic-o-input-field__calendar-select-year'),
      currentMonth = new Date().getMonth(),
      currentYear = new Date().getFullYear();
    let
      currPage = currentMonth,
      yearInput;

    _createCustomCalendar($calendarContainer, currentMonth, currentYear, currentYear, $typeOfInput);

    if ($typeOfInput !== 'month') {
      // For the Calendar buttons
      $nextMonthButton.addEventListener('click', () => {
        if (currPage < 11) {
          currPage += 1;
          yearInput = $yearSelect !== null ? $yearSelect.value : currentYear;
        }
        else {
          currPage = 0;
          yearInput = $yearSelect !== null ? $yearSelect.value += 1 : currentYear;
        }
        _createCustomCalendar($calendarContainer, currPage, yearInput, currentYear, $typeOfInput);
      });

      $prevMonthButton.addEventListener('click', () => {
        if (currPage > 0) {
          currPage -= 1;
          yearInput = $yearSelect !== null ? $yearSelect.value : currentYear;
        }
        else {
          currPage = 11;
          yearInput = $yearSelect !== null ? $yearSelect.value -= 1 : currentYear;
        }
        _createCustomCalendar($calendarContainer, currPage, yearInput, currentYear, $typeOfInput);
      });
    }

    if ($typeOfInput === 'date' || $typeOfInput === 'datetime-local') {
      $yearSelect.addEventListener('change', (e) => {
        _createCustomCalendar($calendarContainer, currPage, e.target.value, currentYear, $typeOfInput);
      });
    }

    // Since there is only one input box, we don't need to event delagate
    if ($typeOfInput === 'datetime-local') {
      $calendarContainer.querySelector('.aic-o-input-field__time').addEventListener('focusout', (e) => {
        if (e.target.value !== null && e.target.getAttribute('data-date') !== null) {
          this.GetValue(e, 'datetimeCustom');
        }
      });
    }

    ['click', 'focusin'].forEach((eventName) => {
      $inputContainer.addEventListener(eventName, () => {
        if (!generalFunctions.detectViewWindow($container, $calendarContainer)) {
          $calendarContainer.style.marginTop = '-300px';
        }
        else {
          $calendarContainer.style.marginTop = '-40px';
        }
        $calendarContainer.classList.add('aiu-display--block');
        _BGSetup($calendarContainer);
      });
    });

    window.addEventListener('scroll', () => {
      if ($calendarContainer.classList.contains('aiu-display--block') && !generalFunctions.detectViewWindow($container, $calendarContainer)) {
        $calendarContainer.style.marginTop = '-300px';
      }
      else {
        $calendarContainer.style.marginTop = '-40px';
      }
    });
    window.addEventListener('load', () => {
    });
  };
}
