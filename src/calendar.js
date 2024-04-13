import langs from './lang'
const calendarInit = (options) => {
  // 默认类型
  options = {
    lang: 'zh',
    type: 'date',
    maskClosable: true,
    minYear: (new Date().getFullYear() - 15),
    maxYear: (new Date().getFullYear() + 4),
    ...options
  }
  const lang = langs[options.lang]
  const body = document.body || document.querySelector('body')
  const elemInput = document.querySelector(options.target)
  elemInput.setAttribute('readonly', 'readonly')

  // 默认时间
  const defaultDate = new Date(elemInput.value || new Date())
  let year = defaultDate.getFullYear(), month = defaultDate.getMonth() + 1, day = defaultDate.getDate();
  let hours = defaultDate.getHours(), minute = defaultDate.getMinutes(), seconds = defaultDate.getSeconds();

  // 获取月份天数
  const getDaysInMonth = (y, m) => {
    const date = new Date(y, m - 1, 1)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date.getDate()
  }

  // 遍历日期
  const pushDays = (params) => {
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
        const active = document.querySelector('.item-day .active')
        if (active) {
          active.classList.remove('active')
        }
        this.classList.add('active')
        if (options.dayChange) {
          options.dayChange(`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`)
        }
        if (options.type === 'date') {
          elemInput.value = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
          body.removeChild(params.dCalendar)
        }
      })
      itemDay.appendChild(itemDayText)
      params.parentElem.appendChild(itemDay)
    }
  }

  // 补充上个月天数
  const setPrevDays = (parentElem, dCalendar, y, m) => {
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
  const setNextDays = (parentElem, dCalendar, y, m) => {
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
  const setDaysElems = (parentElem, dCalendar, y, m) => {
    parentElem.innerHTML = `<div class="d-calendar-week"><span>${lang.weeks[1]}</span><span>${lang.weeks[2]}</span><span>${lang.weeks[3]}</span><span>${lang.weeks[4]}</span><span>${lang.weeks[5]}</span><span>${lang.weeks[6]}</span><span>${lang.weeks[7]}</span></div>`
    setPrevDays(parentElem, dCalendar, y, m)
    const days = getDaysInMonth(y, m)
    pushDays({ parentElem, dCalendar, startDay: 1, endDay: days, year, month })
    setNextDays(parentElem, dCalendar, y, m)
  }

  // 设置可选月份
  const setMonthsElems = (parentElem, dCalendar, dCalendarMonth) => {
    parentElem.innerHTML = ''
    for (let i = 1; i <= 12; i++) {
      const itemMonth = document.createElement('div')
      itemMonth.classList.add('item-month')
      const itemMonthText = document.createElement('span')
      itemMonthText.innerText = `${lang.months[i]}`
      if (month === i) {
        itemMonthText.classList.add('active')
      }
      itemMonthText.addEventListener('click', function () {
        month = i
        dCalendarMonth.innerText = `${lang.months[month]}`
        const active = document.querySelector('.item-month .active')
        if (active) {
          active.classList.remove('active')
        }
        this.classList.add('active')
        if (options.type === 'month') {
          elemInput.value = `${year}-${month < 10 ? `0${month}` : month}`
          body.removeChild(dCalendar)
        }
        if (options.monthChange) {
          options.monthChange(`${year}-${month < 10 ? `0${month}` : month}`)
        }
        if (['date', 'date-time'].includes(options.type)) {
          setDaysElems(parentElem, dCalendar, year, month)
        }
      })
      itemMonth.appendChild(itemMonthText)
      parentElem.appendChild(itemMonth)
    }
  }

  // 设置可选年份
  const setYearsElems = (parentElem, dCalendar, dCalendarYear, dCalendarMonth, minYear, maxYear) => {
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
        dCalendarYear.innerText = `${year}`
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
        if (['date', 'date-time'].includes(options.type)) {
          setDaysElems(parentElem, dCalendar, year, month)
        }
      })
      itemYear.appendChild(itemYearText)
      parentElem.appendChild(itemYear)
    }
  }
  
  // 移动
  const move = (el, length, height, translateY, callback) => {
    let startX, startY, distanceX, distanceY;
     
    const touchStart = (e) => {
      startX = e.touches[0].pageX
      startY = e.touches[0].pageY
    }
     
    const touchMove = (e) => {
      const moveX = e.touches[0].pageX
      const moveY = e.touches[0].pageY
      distanceX = moveX - startX
      distanceY = moveY - startY
     
      // 垂直方向滑动
      if (Math.abs(distanceX) <= Math.abs(distanceY)) {
        translateY = translateY + distanceY
        if (translateY > height) {
          translateY = height
        }
        if (translateY < ((2 - length) * height)) {
          translateY = (2 - length) * height
        }
        el.style = `transform: translateY(${translateY}px);`
      }
    }
     
    // 滑动结束时取整，变量归零
    const touchEnd = (e) => {
      translateY = Math.round(translateY / height) * height
      el.style = `transform: translateY(${translateY}px);`
      startX = startY = distanceX = distanceY = 0
      // 回调，返回选择值
      if (callback) callback(Math.abs(Math.round(translateY / height) - 1))
    }
     
    el.addEventListener('touchstart', touchStart, false)
    el.addEventListener('touchmove', touchMove, false)
    el.addEventListener('touchend', touchEnd, false)
  }

  // 遍历可选数字
  const setSelectNumber = (contentEL, length, active, callback) => {
    const el = document.createElement('div')
    el.classList.add('list')
    for (let i = 0; i < length; i++) {
      const itemEL = document.createElement('div')
      itemEL.classList.add('list-item')
      itemEL.innerText = i < 10 ? `0${i}` : i
      el.appendChild(itemEL)
    }
    const height = 40
    el.style = `transform: translateY(${(1 - active) * height}px);`
    move(el, length, height, (1 - active) * height, callback)
    contentEL.appendChild(el)
  }

  // 设置可选时间
  const setTimeElems = (parentElem, dCalendar) => {
    const contentEL = document.createElement('div')
    contentEL.classList.add('d-calendar-time')

    setSelectNumber(contentEL, 24, hours, (v) => { hours = v })
    setSelectNumber(contentEL, 60, minute, (v) => { minute = v })
    setSelectNumber(contentEL, 60, seconds, (v) => { seconds = v })

    const footerEl = document.createElement('div')
    footerEl.classList.add('d-calendar-footer')

    const cancelEl = document.createElement('button')
    cancelEl.classList.add('button-close')
    cancelEl.innerText = options.cancelText || lang.cancelText
    cancelEl.addEventListener('click', () => {
      body.removeChild(dCalendar)
    })

    const confirmEl = document.createElement('button')
    confirmEl.classList.add('button-confirm')
    confirmEl.innerText = options.confirmText || lang.confirmText
    confirmEl.addEventListener('click', () => {
      const date = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
      const time = `${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`
      if (options.type === 'time') {
        elemInput.value = time
      }
      if (options.type === 'date-time') {
        elemInput.value = `${date} ${time}`
      }
      if (options.dateTimeChange) {
        options.dateTimeChange(`${date} ${time}`)
      }
      if (options.timeChange) {
        options.timeChange(time)
      }
      body.removeChild(dCalendar)
    })

    footerEl.appendChild(cancelEl)
    footerEl.appendChild(confirmEl)
    
    parentElem.appendChild(contentEL)
    parentElem.appendChild(footerEl)
  }

  elemInput.addEventListener('click', function () {
    // 根节点
    const dCalendar = document.createElement('div')
    dCalendar.classList.add('d-calendar')

    // 遮罩
    const dCalendarMask = document.createElement('div')
    dCalendarMask.classList.add('d-calendar-mask')
    if (options.maskClosable) {
      dCalendarMask.addEventListener('click', function () {
        body.removeChild(dCalendar)
      })
    }
    dCalendar.appendChild(dCalendarMask)

    // 容器
    const dCalendarContainer = document.createElement('div')
    dCalendarContainer.classList.add('d-calendar-container')
    dCalendar.appendChild(dCalendarContainer)

    // header盒子
    const dCalendarHeader = document.createElement('div')
    dCalendarHeader.classList.add('d-calendar-header')
    dCalendarContainer.appendChild(dCalendarHeader)
    
    if (['year', 'month', 'date'].includes(options.type)) {
      // 取消
      const dCalendarClose = document.createElement('span')
      dCalendarClose.classList.add('d-calendar-close')
      dCalendarClose.addEventListener('click', function () {
        body.removeChild(dCalendar)
      })
      dCalendarHeader.appendChild(dCalendarClose)
    }
    
    if (['year', 'month', 'date', 'date-time'].includes(options.type)) {
      // 年
      const dCalendarYear = document.createElement('span')
      dCalendarYear.classList.add('d-calendar-year')
      dCalendarYear.innerText = `${year}`
      dCalendarYear.addEventListener('click', function() {
        setYearsElems(dCalendarContent, dCalendar, this, dCalendarMonth, options.minYear, options.maxYear)
      })
      if (options.lang !== 'en') {
        dCalendarHeader.appendChild(dCalendarYear)
      }

      // 月
      const dCalendarMonth = document.createElement('span')
      if (options.type !== 'year') {
        dCalendarMonth.classList.add('d-calendar-month')
        dCalendarMonth.innerText = `${lang.months[month]}`
        dCalendarMonth.addEventListener('click', function() {
          setMonthsElems(dCalendarContent, dCalendar, this)
        })
        dCalendarHeader.appendChild(dCalendarMonth)
      }

      if (options.lang === 'en') {
        dCalendarHeader.appendChild(dCalendarYear)
      }

      // 内容盒子
      const dCalendarContent = document.createElement('div')
      dCalendarContent.classList.add('d-calendar-content')
      dCalendarContainer.appendChild(dCalendarContent)
      
      if (options.type === 'year') {
        setYearsElems(dCalendarContent, dCalendar, this, dCalendarMonth, options.minYear, options.maxYear)
      }
      if (options.type === 'month') {
        setMonthsElems(dCalendarContent, dCalendar, dCalendarMonth)
      }
      if (['date', 'date-time'].includes(options.type)) {
        setDaysElems(dCalendarContent, dCalendar, year, month)
      }
    }
      
    if (['time', 'date-time'].includes(options.type)) {
      setTimeElems(dCalendarContainer, dCalendar)
    }

    // 挂在body
    body.appendChild(dCalendar)
  })
}

export { calendarInit }
