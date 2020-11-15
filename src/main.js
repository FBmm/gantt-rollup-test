import zrender from "zrender"
import dayjs from "dayjs"
class Gantt {
  ganttInstance;
  startDate = dayjs('2020-11-13');
  endDate = dayjs('2021-11-15');

  dateGroupMode = "week";

  dateGroup = [];

  gapNum = 2;
  columnWidth = 30;

  // header
  yearHeight = 30;
  dateHeight = 40;

  // body
  bodyHeight = 200;

  constructor(dom, opt = {}) {
    this.dom = dom;
  }
  init() {
    this.ganttInstance = zrender.init(this.dom, {
      width: 5000,
    });
    this.dateGroup = this.getDateGroup(this.dateGroupMode)
    this.CNWeeks = this.getCNWeeks()
    this.drawTable()
    return this.ganttInstance;
  }
  getCNWeeks() {
    return ['日','一','二','三','四','五','六']
  }
  drawTable() {
    let yearX = 0;
    let dateX = 0;
    let bodyX = 0;
    this.dateGroup.forEach(dates => {
      const startDate = dates?.[0]
      const endDate = dates?.[dates.length - 1]
      const text = startDate && endDate ? `${startDate.replace(/-/g, '.')}-${endDate.replace(/-/g, '.')}` : ''
      yearX = this.drawHeaderYear(dates.length, yearX, text)
      dateX = this.drawHeaderDate(dates, dateX)
      bodyX = this.drawBody(dates, bodyX)
    });
  }
  drawBody(dates, startX) {
    dates.forEach(date => {
      const isWeekend = [0, 6].includes(dayjs(date).day())
      const isSUN = dayjs(date).day() === 0
      const rectY = this.yearHeight + this.dateHeight + this.gapNum
      const rect = new zrender.Rect({
        shape: {
          x: startX,
          y: rectY,
          width: this.columnWidth,
          height: this.bodyHeight,
        },
        style: {
          fill: isWeekend ? '#f2f5fa' : "#fff",
        }
      });
      this.ganttInstance.add(rect)

      const lineX = startX - this.gapNum / 2
      const lineY1 = this.yearHeight + this.dateHeight + this.gapNum
      const line = new zrender.Line({
        shape: {
          x1: lineX,
          y1: lineY1,
          x2: lineX,
          y2: this.bodyHeight + lineY1,
        },
        style: {
          stroke: isSUN ? '#ebecf0' : '#f0f0f0',
          lineWidth: this.gapNum,
        }
      });
      this.ganttInstance.add(line)

      startX += this.columnWidth
    })
    return startX + this.gapNum
  }
  drawHeaderDate(dates, startX) {
    dates.forEach(date => {
      const supRect = new zrender.Rect({
        shape: {
          x: startX,
          y: this.yearHeight,
          width: this.columnWidth,
          height: 0,
        },
        style: {
          textFill: "#bcbcbc",
          textOffset: [5, 12],
          fontSize: 10,
          text: this.getHeaderDateText(date, true),
        },
        zlevel: 10,
      });
      this.ganttInstance.add(supRect)

      const dateRect = new zrender.Rect({
        shape: {
          x: startX,
          y: this.yearHeight,
          width: this.columnWidth,
          height: this.dateHeight,
        },
        style: {
          fill: '#f2f5fa',
          textOffset: [0, 5],
          text: this.getHeaderDateText(date),
        },
        zlevel: 9,
      });
      this.ganttInstance.add(dateRect)
      startX += this.columnWidth
    })
    return startX + this.gapNum
  }
  getHeaderDateText(dateStr, isSup = false) {
    const day = this.CNWeeks[dayjs(dateStr).day()]
    const date = dayjs(dateStr).date()
    if (this.dateGroupMode === 'week') {
      return isSup ? date : day
    } else {
      return isSup ? day : date
    }
  }
  getDateGroup(mode = 'week') {
    let currentDate = this.startDate
    const days = this.endDate.diff(this.startDate, 'day')
    const list = []
    let sub = []
    for (let i = 0; i <= days; i++) {
      if (mode === 'week') {
        const week = dayjs(currentDate).day()
        if (week === 1) {
          list.push(sub)
          sub = []
        }
      }
      if (mode === 'month') {
        const date = dayjs(currentDate).date()
        if (date === 1) {
          list.push(sub)
          sub = []
        }
      }
      sub.push(currentDate.format('YYYY-MM-DD'))
      currentDate = currentDate.add(1, 'day')
    }
    if (sub.length) {
      list.push(sub)
    }
    console.log(list)
    return list
  }
  drawHeaderYear(dayNum, startX = 0, text) {
    const height = this.yearHeight
    const offset = 2
    const dayWidth = 30
    const width = dayNum * dayWidth
    const rect = new zrender.Rect({
      shape: {
        x: startX,
        y: 0,
        width: width,
        height: height,
      },
      style: {
        fill: '#e0e6ee',
        text: width > 150 ? text : "",
      }
    });
    this.ganttInstance.add(rect);
    return startX + width + offset;
  }
}

const gantt = new Gantt(document.getElementById('main'));
gantt.init();


