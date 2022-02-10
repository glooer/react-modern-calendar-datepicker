import jalaali from 'jalaali-js';

import {
  GREGORIAN_MONTHS,
  PERSIAN_MONTHS,
  GREGORIAN_WEEK_DAYS,
  PERSIAN_WEEK_DAYS,
  PERSIAN_NUMBERS,
} from './constants';
import { toExtendedDay } from './generalUtils';

const localeLanguages = {
  en: {
    months: GREGORIAN_MONTHS,
    weekDays: GREGORIAN_WEEK_DAYS,
    weekStartingIndex: 0,
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
    transformDigit(digit) {
      return digit;
    },
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    from: 'from',
    to: 'to',
    defaultPlaceholder: 'Select...',
    digitSeparator: ',',
    yearLetterSkip: 0,
    isRtl: false,
  },
  fa: {
    months: PERSIAN_MONTHS,
    weekDays: PERSIAN_WEEK_DAYS,
    weekStartingIndex: 1,
    getToday({ year, month, day }) {
      const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
      return { year: jy, month: jm, day: jd };
    },
    toNativeDate(date) {
      const gregorian = jalaali.toGregorian(...toExtendedDay(date));
      return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
    },
    getMonthLength(date) {
      return jalaali.jalaaliMonthLength(date.year, date.month);
    },
    transformDigit(digit) {
      return digit
        .toString()
        .split('')
        .map(letter => PERSIAN_NUMBERS[Number(letter)])
        .join('');
    },
    nextMonth: 'ماه بعد',
    previousMonth: 'ماه قبل',
    openMonthSelector: 'نمایش انتخابگر ماه',
    openYearSelector: 'نمایش انتخابگر سال',
    closeMonthSelector: 'بستن انتخابگر ماه',
    closeYearSelector: 'بستن انتخابگر ماه',
    from: 'از',
    to: 'تا',
    defaultPlaceholder: 'انتخاب...',
    digitSeparator: '،',
    yearLetterSkip: -2,
    isRtl: true,
  },

  ru: {
    // months list by order
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],

    // week days by order
    weekDays: [
      {
        name: 'Понедельник',
        short: 'ПН',
      },
      {
        name: 'Вторник',
        short: 'ВТ',
      },
      {
        name: 'Среда',
        short: 'СР',
      },
      {
        name: 'Четверг',
        short: 'ЧТ',
      },
      {
        name: 'Пятница',
        short: 'ПТ',
      },
      {
        name: 'Суббота',
        short: 'СБ',
        isWeekend: true,
      },
      {
        name: 'Воскресенье', // used for accessibility
        short: 'ВС', // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 6,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },

    // texts in the date picker
    nextMonth: 'Следующий месяц',
    previousMonth: 'Предыдущий месяц',
    openMonthSelector: 'Открыть выбор месяца',
    openYearSelector: 'Открыть выбор года',
    closeMonthSelector: 'Закрыть выбор месяца',
    closeYearSelector: 'Закрыть выбор года',
    defaultPlaceholder: '',

    // for input range value
    from: 'from',
    to: 'to',

    // used for input value when multi dates are selected
    digitSeparator: '.',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
  },
};

const getLocaleDetails = locale => {
  if (typeof locale === 'string') return localeLanguages[locale];
  return locale;
};

export { localeLanguages };
export default getLocaleDetails;
