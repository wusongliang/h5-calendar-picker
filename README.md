# h5-calendar-picker

#### 介绍(description)
(H5 time/date/month/year selection, small file size, no dependency package; Simple style, can be modified and overlaid by oneself)
h5时间/日期/月份/年份选择，文件小，无依赖包；样式简陋，可自行修改覆盖

#### 示例效果(example)
<a href="https://d-calendar-example.netlify.app">example</a>

#### 使用例子(use)
```html
<input id="date" type="text" placeholder="Select Date">

<script>
  import { calendarInit } from 'h5-calendar-picker'
  import 'h5-calendar-picker/dist/calendar.css'
  calendarInit({
    lang: 'zh', // en | zh
    target: '#date',
    type: 'date', // date | month | year | date-time | time
    minYear: 2000, // optional (选填)
    maxYear: 2024, // optional (选填)
    cancelText: 'Cancel', // optional (选填)
    confirmText: 'Confirm', // optional (选填)
    maskClosable: true, // 是否点击遮罩层关闭 (选填) (Do you want to click on the mask layer to close)
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
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/h5-calendar-picker@1.1.2/dist/calendar.css">
 <script src="https://cdn.jsdelivr.net/npm/h5-calendar-picker@1.1.2/dist/calendar.js"></script>
```
