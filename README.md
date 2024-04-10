# h5-calendar-picker

#### 介绍
h5时间/日期/月份/年份选择，文件小，无依赖包；样式简陋，可自行修改覆盖

#### 示例效果
<a href="https://d-calendar-example.netlify.app">example</a>

#### 使用例子
```html
<input id="date" type="text" placeholder="Select Date">

<script>
  import { calendarInit } from 'h5-calendar-picker'
  import 'h5-calendar-picker/dist/calendar.css'
  calendarInit({
    target: '#date',
    type: 'date', // month | year | date-time | time
    minYear: 2000,
    maxYear: 2024,
    maskClosable: true, // 是否点击遮罩层关闭
    dayChange: function (value) {
      console.log('date: ' + value)
    },
    monthChange: function (value) {
      console.log('month: ' + value)
    },
    yearChange: function (value) {
      console.log('year: ' + value)
    },
    timeChange: function (value) {
      console.log('time: ' + value)
    },
    dateTimeChange: function (value) {
      console.log('date-time: ' + value)
    }
  })
</script>
```
or

```html
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/h5-calendar-picker@1.0.0/dist/calendar.css">
 <script src="https://cdn.jsdelivr.net/npm/h5-calendar-picker@1.0.0/dist/calendar.js"></script>
```
