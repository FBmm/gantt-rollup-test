import zrender  from "zrender"
import dayjs from "dayjs"
class Gantt {
  ganttInstance;
  startDate = dayjs('2020-11-13')
  endDate = dayjs('2021-11-15')
  constructor(dom, opt = {}) {
    this.dom = dom;
  }
  init() {
    this.ganttInstance = zrender.init(this.dom);
    this.drawTopRect(7)
    this.groupData()
    return this.ganttInstance;
  }
  groupData(mode = 'month') {
    let currentDate = this.startDate
    const days = this.endDate.diff(this.startDate, 'day')
    const list = []
    let sub = []
    for (let i = 0; i <= days; i++) {
      if (mode === 'week') {
        const week = dayjs(currentDate).day()
        if (week === 0) {
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
      sub.push(currentDate.format('YYYY/MM/DD'))
      currentDate = currentDate.add(1, 'day')
    }
    if (sub.length) {
      list.push(sub)
    }
    console.log(list)
    return list
  }
  drawTopRect(day) {
    const height = 30
    const offset = 2
    const dayWidth = 30
    const width = day * dayWidth
    for (let i = 0; i < 7; i++) {
      const rect = new zrender.Rect({
        shape: {
            x: i * (width + offset),
            y: 0,
            width: width,
            height: height,
        },
        style: {
            fill: '#e0e6ee',
            text: "2020.11.09-2020.11.15",
        }
      });
      this.ganttInstance.add(rect);
    }
  }
}

const gantt = new Gantt(document.getElementById('main'));
gantt.init();

var ganttHeaderYears = new zrender.Rect({
  shape: {
      x: 0,
      y: 0,
      width: 210,
      height: 30,
  },
  style: {
      fill: '#e0e6ee',
      text: "2020.11.09-2020.11.15",
  }
});


function drawDay() {
  for (let i = 0; i < 7; i++) {
    var ganttHeaderWeek = new zrender.Rect({
      shape: {
          x: i * 30,
          y: 30,
          width: 30,
          height: 10,
      },
      style: {
          fill: '#f2f5fa',
          text: i,
          textFill: "#bcbcbc",
          textPosition: [20,8],
      },
      zlevel: 10,
    });
    zr.add(ganttHeaderWeek);
  }
}

// drawDay()

function drawWeek() {
  const chineseWeeks = ["日", "一", "二", "三", "四", "五", "六"];
  for (let i = 0; i < 7; i++) {
    var ganttHeaderWeek = new zrender.Rect({
      shape: {
          x: i * 30,
          y: 40,
          width: 30,
          height: 30,
      },
      style: {
          fill: '#f2f5fa',
          text: chineseWeeks[i],
      },
      zlevel: 9,
    });
    zr.add(ganttHeaderWeek);
  }
}

// drawWeek()

function drawColumn(x = 0, y = 0) {
  for (let i = 0; i < 7; i++) {
    const ganttContentDay = new zrender.Rect({
      shape: {
          x: i * 30 + 28,
          y: 60,
          width: 2,
          height: 200,
      },
      style: {
          fill: '#efefef',
      }
    });
    zr.add(ganttContentDay);
  }
}
// drawColumn()





var i = 2000;
document.getElementById("btn").addEventListener('click', function() {
 i = i + 100
  zr.resize({
    width: i
  })
})


