import React, { useRef, useEffect } from 'react';

import { isSameDay } from '../shared/generalUtils';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { useLocaleUtils, useLocaleLanguage } from '../shared/hooks';
import { PICKER_MONTH } from '../shared/constants';

const MonthSelector = ({
  value,
  activeDate,
  maximumDate,
  minimumDate,
  onMonthSelect,
  isOpen,
  locale,
  calendarRangeStartClassName,
  calendarRangeEndClassName,
  calendarRangeBetweenClassName,
  picker,
}) => {
  const monthSelector = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const { getMonthNumber, isBeforeDate, checkDayInDayRange } = useLocaleUtils(locale);
  const { months: monthsList } = useLocaleLanguage(locale);

  const handleKeyDown = e => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

  const getMonthStatus = monthItem => {
    const startingDay = value?.from
      ? { day: 1, month: value.from.month, year: value.from.year }
      : undefined;
    const endingDay = value?.to ? { day: 1, month: value.to.month, year: value.to.year } : undefined;

    const isStartingDayRange = isSameDay(monthItem, startingDay);
    const isEndingDayRange = isSameDay(monthItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: monthItem, from: startingDay, to: endingDay });

    return { isStartingDayRange, isEndingDayRange, isWithinRange };
  };

  const getMonthClassNames = monthDate => {
    const { isStartingDayRange, isEndingDayRange, isWithinRange } = getMonthStatus(monthDate);

    return ''
      .concat(isStartingDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '');
  };

  const isAnimate = picker !== PICKER_MONTH;

  const renderMonthSelectorItems = () =>
    monthsList.map(persianMonth => {
      const monthNumber = getMonthNumber(persianMonth);
      const monthDate = { day: 1, month: monthNumber, year: activeDate.year };
      const isAfterMaximumDate =
        maximumDate && isBeforeDate(maximumDate, { ...monthDate, month: monthNumber });
      const isBeforeMinimumDate =
        minimumDate &&
        (isBeforeDate({ ...monthDate, month: monthNumber + 1 }, minimumDate) ||
          isSameDay({ ...monthDate, month: monthNumber + 1 }, minimumDate));
      const isSelected = monthNumber === activeDate.month && picker !== PICKER_MONTH;
      const additionalClass = getMonthClassNames(monthDate).concat(isSelected ? ` -active` : '');
      return (
        <li key={persianMonth} className={`Calendar__monthSelectorItem ${additionalClass}`}>
          <button
            tabIndex={isSelected && isOpen ? '0' : '-1'}
            onClick={() => {
              onMonthSelect(monthNumber);
            }}
            className="Calendar__monthSelectorItemText"
            type="button"
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {persianMonth}
          </button>
        </li>
      );
    });
  return (
    <div
      role="presentation"
      className={`Calendar__monthSelectorAnimationWrapper ${
        picker === PICKER_MONTH ? 'withoutDays' : ''
      }`}
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        role="presentation"
        data-testid="month-selector-wrapper"
        className="Calendar__monthSelectorWrapper"
        onKeyDown={handleKeyDown}
      >
        <ul
          ref={monthSelector}
          className={`Calendar__monthSelector ${!isAnimate ? 'withoutAnimate' : ''}`}
          data-testid="month-selector"
        >
          {renderMonthSelectorItems()}
        </ul>
      </div>
    </div>
  );
};

MonthSelector.defaultProps = {
  calendarRangeStartClassName: '',
  calendarRangeBetweenClassName: '',
  calendarRangeEndClassName: '',
};

export default MonthSelector;
