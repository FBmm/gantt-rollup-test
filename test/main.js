import zrender  from "zrender"
var zr = zrender.init(document.getElementById('main'));
var ellipse = new zrender.Ellipse({
  shape: {
      cx: 100,
      cy: 50,
      rx: 50,
      ry: 30,
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(ellipse);

var circle = new zrender.Circle({
  shape: {
      cx: 300,
      cy: 50,
      r: 40,
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(circle);

var Droplet = new zrender.Droplet({
  shape: {
      cx: 500,
      cy: 60,
      width: 20,
      height: 40,
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(Droplet);

var Heart = new zrender.Heart({
  shape: {
      cx: 700,
      cy: 30,
      width: 30,
      height: 40,
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(Heart);

var Isogon = new zrender.Isogon({
  shape: {
      x: 900,
      y: 50,
      r: 30,
      n: 5,
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(Isogon);

var Line = new zrender.Line({
  shape: {
      x1: 1000,
      y1: 50,
      x2: 1100,
      y2: 50,
      percent: 0.7
  },
  style: {
      fill: 'pink',
      stroke: '#F00',
      lineWidth: 10,
  }
});
zr.add(Line);

var Polygon = new zrender.Polygon({
  shape: {
    points: [[10,100], [20, 80], [30, 60], [25, 100]]
  },
  style: {
      fill: 'pink',
      stroke: '#F00'
  }
});
zr.add(Polygon);

