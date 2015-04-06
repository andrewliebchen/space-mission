createBackground = function(){
  var t = new Trianglify({
    cellsize: 10,
    y_gradient: Trianglify.randomColor()
  });
  var pattern = t.generate(50, 50);
  return pattern.dataUri;
}
