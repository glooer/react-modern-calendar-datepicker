(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{155:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(165),l=t.n(r),s=t(164),o=t(159);a.default=function(){var e=Object(n.useState)(null),a=e[0],t=e[1];return c.a.createElement(s.a,{title:"Core Concepts"},c.a.createElement("p",{className:"Docs__paragraph"},"Now that you've installed the package. It's the time to get familiarized with the core concepts of react-persian-calendar-date-picker. In a nutshell, there are two major components available to import:"),c.a.createElement("ul",{className:"Docs__list"},c.a.createElement("li",null,"1- ",c.a.createElement("code",{className:"custom-code"},"<DatePicker />")," default exported component which includes an input and a calendar."),c.a.createElement("li",null,"2- ",c.a.createElement("code",{className:"custom-code"},"<Calendar />")," component which is the calendar itself.")),c.a.createElement("p",{className:"Docs__paragraph"},"By the way, we're gonna use ",c.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",className:"Docs__link",href:" https://reactjs.org/docs/hooks-intro.html"}," React hooks ")," for examples provided in this document."),c.a.createElement("h2",{className:"Docs__titleSecondary"},"Basic Usage"),c.a.createElement("p",{className:"Docs__paragraph"},"Let's kick things off by providing an example:"),c.a.createElement("div",{className:"Docs__sampleContainer"},c.a.createElement(o.a,{language:"javascript"},'\nimport React, { useState } from "react";\nimport "react-persian-calendar-date-picker/lib/DatePicker.css";\nimport DatePicker from "react-persian-calendar-date-picker";\n\nconst App = () => {\n  const [selectedDay, setSelectedDay] = useState(null);\n  return (\n    <DatePicker\n      selectedDay={selectedDay}\n      onChange={setSelectedDay}\n    />\n  );\n};\n\nexport default App;\n\n          '),c.a.createElement(l.a,{wrapperClassName:"persianFontWrapper -aboveAll",calendarClassName:"persianFontWrapper",selectedDay:a,onChange:t})))}},164:function(e,a,t){"use strict";var n=t(0),c=t.n(n),r=t(159);t(148);a.a=function(e){var a=e.title,t=e.children;return c.a.createElement(r.c,null,c.a.createElement(r.d,{title:a+" - react-persian-calendar-date-picker",keywords:[a]}),c.a.createElement("div",{className:"Docs"},c.a.createElement(r.b,null),c.a.createElement("div",{className:"Docs__content"},c.a.createElement("h1",{className:"Docs__title"},a),t)))}}}]);
//# sourceMappingURL=component---src-pages-docs-core-concepts-js-ffe8e9054cf7ed5aca80.js.map