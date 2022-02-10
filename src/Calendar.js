import React, { useState, useRef, useEffect } from 'react';

import {
  getDateAccordingToMonth,
  shallowClone,
  getValueType,
  deepCloneObject,
} from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE, PICKER_MONTH } from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

import { Header, MonthSelector, YearSelector, DaysList } from './components';

const Calendar = ({
  value,
  onChange,
  onDisabledDayError,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
  picker,
}) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: picker === PICKER_MONTH,
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    if (calendarElement.current === null) {
      return;
    }

    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      if (calendarElement.current !== null) {
        calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
      }
    };
  }, [calendarElement]);

  const { getToday, isBeforeDate } = useLocaleUtils(locale);
  const { weekDays: weekDaysList, isRtl } = useLocaleLanguage(locale);
  const today = getToday();

  const createStateToggler = property => () => {
    setMainState({ ...mainState, [property]: !mainState[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && value.length) return shallowClone(value[0]);
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && value.from) return shallowClone(value.from);
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const weekdays = weekDaysList.map(weekDay => (
    <abbr key={weekDay.name} title={weekDay.name} className="Calendar__weekDay">
      {weekDay.short}
    </abbr>
  ));

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection),
      monthChangeDirection: '',
    });
  };

  const selectMonth = newMonthNumber => {
    if (picker !== PICKER_MONTH) {
      setMainState({
        ...mainState,
        activeDate: { ...activeDate, month: newMonthNumber },
        isMonthSelectorOpen: false,
      });
    } else {
      const getDayRangeValue = day => {
        const clonedDayRange = deepCloneObject(value);
        const dayRangeValue =
          clonedDayRange.from && clonedDayRange.to ? { from: null, to: null } : clonedDayRange;
        const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
        dayRangeValue[dayRangeProp] = day;
        const { from, to } = dayRangeValue;

        // swap from and to values if from is later than to
        if (isBeforeDate(dayRangeValue.to, dayRangeValue.from)) {
          dayRangeValue.from = to;
          dayRangeValue.to = from;
        }

        return dayRangeValue;
      };

      const getNewValue = () => {
        const day = { ...activeDate, month: newMonthNumber, day: 1 };
        const valueType = getValueType(value);
        switch (valueType) {
          case TYPE_SINGLE_DATE:
            return day;
          case TYPE_RANGE:
            return getDayRangeValue(day);
        }
      };
      const newValue = getNewValue();
      onChange(newValue);
    }
  };

  const selectYear = year => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
      isYearSelectorOpen: false,
    });
  };

  return (
    <div
      className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
      role="grid"
      style={{
        '--cl-color-primary': colorPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
        '--animation-duration': slideAnimationDuration,
      }}
      ref={calendarElement}
    >
      <Header
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onMonthSelect={toggleMonthSelector}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isMonthSelectorOpen={mainState.isMonthSelectorOpen}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
        locale={locale}
        onYearChange={selectYear}
        picker={picker}
      />

      <MonthSelector
        value={value}
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        picker={picker}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      {picker !== PICKER_MONTH && (
        <>
          <div className="Calendar__weekDays">{weekdays}</div>

          <DaysList
            activeDate={activeDate}
            value={value}
            monthChangeDirection={mainState.monthChangeDirection}
            onSlideChange={updateDate}
            disabledDays={disabledDays}
            onDisabledDayError={onDisabledDayError}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={onChange}
            calendarTodayClassName={calendarTodayClassName}
            calendarSelectedDayClassName={calendarSelectedDayClassName}
            calendarRangeStartClassName={calendarRangeStartClassName}
            calendarRangeEndClassName={calendarRangeEndClassName}
            calendarRangeBetweenClassName={calendarRangeBetweenClassName}
            locale={locale}
            shouldHighlightWeekends={shouldHighlightWeekends}
            customDaysClassName={customDaysClassName}
            isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
          />
        </>
      )}
      <div className="Calendar__footer">{renderFooter()}</div>
    </div>
  );
};

Calendar.defaultProps = {
  onChange: () => {},
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'en',
  value: null,
  renderFooter: () => null,
  customDaysClassName: [],
};

export { Calendar };
