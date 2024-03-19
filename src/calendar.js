export const calendarInit = function(options) {
  const body = document.body || document.querySelector('body')
  const elemInput = document.querySelector(options.target)
  // 默认类型
  options.type = options.type || 'date'

  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let day = new Date().getDate()

  // 获取月份天数
  function getDaysInMonth(y, m) {
    const date = new Date(y, m - 1, 1)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date.getDate()
  }

  // 遍历日期
  function pushDays(params) {
    for (let i = params.startDay; i <= params.endDay; i++) {
      const itemDay = document.createElement('div')
      itemDay.classList.add('item-day')
      const itemDayText = document.createElement('span')
      itemDayText.innerText = i
      if (params.classNames) {
        itemDayText.classList.add(params.classNames)
      }
      if (day === i && year === params.year && month === params.month) {
        itemDayText.classList.add('active')
      }
      // 点击日期时赋值，关闭弹窗
      itemDayText.addEventListener('click', function () {
        day = i
        year = params.year
        month = params.month
        elemInput.value = `${year}-${month}-${day}`
        const active = document.querySelector('.item-day .active')
        if (active) {
          active.classList.remove('active')
        }
        this.classList.add('active')
        if (options.dayChange) {
          options.dayChange(`${year}-${month}-${day}`)
        }
        body.removeChild(params.dCalendar)
      })
      itemDay.appendChild(itemDayText)
      params.parentElem.appendChild(itemDay)
    }
  }

  // 补充上个月天数
  function setPrevDays(parentElem, dCalendar, y, m) {
    const week = new Date(y, m - 1, 1).getDay()
    const prevYear = m === 1 ? (y - 1) : y
    const prevMonth = m === 1 ? 12 : (m - 1)
    const prevDays = getDaysInMonth(prevYear, prevMonth)
    if (week !== 1) {
      pushDays({
        parentElem,
        dCalendar,
        startDay: prevDays - (week === 0 ? 5 : (week - 2)),
        endDay: prevDays,
        year: prevYear,
        month: prevMonth,
        classNames: 'prev'
      })
    }
  }

  // 补充下个月天数
  function setNextDays(parentElem, dCalendar, y, m) {
    const week = new Date(y, m - 1, 1).getDay()
    const days = getDaysInMonth(y, m)
    pushDays({
      parentElem,
      dCalendar,
      startDay: 1,
      endDay: 42 - days - (week === 0 ? 6 : (week - 1)),
      year: m === 12 ? (y + 1) : y,
      month: m === 12 ? 1 : (m + 1),
      classNames: 'next'
    })
  }

  // 设置可选日期
  function setDaysElems(parentElem, dCalendar, y, m) {
    parentElem.innerHTML = '<div class="d-calendar-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>'
    setPrevDays(parentElem, dCalendar, y, m)
    const days = getDaysInMonth(y, m)
    pushDays({ parentElem, dCalendar, startDay: 1, endDay: days, year, month })
    setNextDays(parentElem, dCalendar, y, m)
  }

  // 设置可选月份
  function setMonthsElems(parentElem, dCalendar, dCalendarMonth) {
    parentElem.innerHTML = ''
    for (let i = 1; i <= 12; i++) {
      const itemMonth = document.createElement('div')
      itemMonth.classList.add('item-month')
      const itemMonthText = document.createElement('span')
      itemMonthText.innerText = `${i}月`
      if (month === i) {
        itemMonthText.classList.add('active')
      }
      itemMonthText.addEventListener('click', function () {
        month = i
        dCalendarMonth.innerText = `${month}月`
        const active = document.querySelector('.item-month .active')
        if (active) {
          active.classList.remove('active')
        }
        this.classList.add('active')
        if (options.type === 'month') {
          elemInput.value = `${year}-${month}`
          body.removeChild(dCalendar)
        }
        if (options.monthChange) {
          options.monthChange(`${year}-${month}`)
        }
        if (options.type === 'date') {
          setDaysElems(parentElem, dCalendar, year, month)
        }
      })
      itemMonth.appendChild(itemMonthText)
      parentElem.appendChild(itemMonth)
    }
  }

  // 设置可选年份
  function setYaersElems(parentElem, dCalendar, dCalendarYear, dCalendarMonth, minYear, maxYear) {
    parentElem.innerHTML = ''
    for (let i = minYear; i <= maxYear; i++) {
      const itemYear = document.createElement('div')
      itemYear.classList.add('item-year')
      const itemYearText = document.createElement('span')
      itemYearText.innerText = i
      if (year === i) {
        itemYearText.classList.add('active')
      }
      itemYearText.addEventListener('click', function () {
        year = i
        dCalendarYear.innerText = `${year}年`
        const active = document.querySelector('.item-year .active')
        if (active) {
          active.classList.remove('active')
        }
        this.classList.add('active')
        if (options.type === 'year') {
          elemInput.value = `${year}`
          body.removeChild(dCalendar)
        }
        if (options.yearChange) {
          options.yearChange(`${year}`)
        }
        if (options.type === 'month') {
          setMonthsElems(parentElem, dCalendar, dCalendarMonth)
        }
        if (options.type === 'date') {
          setDaysElems(parentElem, dCalendar, year, month)
        }
      })
      itemYear.appendChild(itemYearText)
      parentElem.appendChild(itemYear)
    }
  }

  elemInput.addEventListener('click', function () {
    // 根节点
    const dCalendar = document.createElement('div')
    dCalendar.classList.add('d-calendar')

    // 遮罩
    const dCalendarMask = document.createElement('div')
    dCalendarMask.classList.add('d-calendar-mask')
    dCalendarMask.addEventListener('click', function () {
      body.removeChild(dCalendar)
    })
    dCalendar.appendChild(dCalendarMask)

    // 容器
    const dCalendarContainer = document.createElement('div')
    dCalendarContainer.classList.add('d-calendar-container')
    dCalendar.appendChild(dCalendarContainer)

    // header盒子
    const dCalendarHeader = document.createElement('div')
    dCalendarHeader.classList.add('d-calendar-header')
    dCalendarContainer.appendChild(dCalendarHeader)

    // 年
    const dCalendarYear = document.createElement('span')
    dCalendarYear.classList.add('d-calendar-year')
    dCalendarYear.innerText = `${year}年`
    dCalendarYear.addEventListener('click', function() {
      setYaersElems(dCalendarContent, dCalendar, this, dCalendarMonth, options.minYear || (new Date().getFullYear() - 15), options.maxYear || (new Date().getFullYear() + 4))
    })
    dCalendarHeader.appendChild(dCalendarYear)

    // 月
    const dCalendarMonth = document.createElement('span')
    dCalendarMonth.classList.add('d-calendar-month')
    dCalendarMonth.innerText = `${month}月`
    dCalendarMonth.addEventListener('click', function() {
      setMonthsElems(dCalendarContent, dCalendar, this)
    })
    dCalendarHeader.appendChild(dCalendarMonth)

    // 取消
    const dCalendarClose = document.createElement('span')
    dCalendarClose.classList.add('d-calendar-close')
    dCalendarClose.addEventListener('click', function () {
      body.removeChild(dCalendar)
    })
    dCalendarHeader.appendChild(dCalendarClose)

    // 内容盒子
    const dCalendarContent = document.createElement('div')
    dCalendarContent.classList.add('d-calendar-content')
    dCalendarContainer.appendChild(dCalendarContent)
    
    if (options.type === 'year') {
      setYaersElems(dCalendarContent, dCalendar, this, dCalendarMonth, options.minYear || (new Date().getFullYear() - 15), options.maxYear || (new Date().getFullYear() + 4))
    }
    if (options.type === 'month') {
      setMonthsElems(dCalendarContent, dCalendar, dCalendarMonth)
    }
    if (options.type === 'date') {
      setDaysElems(dCalendarContent, dCalendar, year, month)
    }

    // 挂在body
    body.appendChild(dCalendar)
  })
}
