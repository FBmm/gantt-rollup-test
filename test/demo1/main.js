import zrender  from "zrender"
var zr = zrender.init(document.getElementById('main'));

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
zr.add(ganttHeaderYears);

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

drawDay()

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

drawWeek()

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
drawColumn()





var i = 2000;
document.getElementById("btn").addEventListener('click', function() {
 i = i + 100
  zr.resize({
    width: i
  })
})


