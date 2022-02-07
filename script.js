function main() {
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        alert("!gl occured");
        return;
    }
  
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);
  
    var positionLocation = gl.getAttribLocation(program, "a_position");
  
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");
  
    var positionBuffer = gl.createBuffer();
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    var translation = [0, 0];
    var width = 100;
    var height = 30;
    var color = [Math.random(), Math.random(), Math.random(), 1];
  
    drawScene();
  
    webglLessonsUI.setupSlider("#x", {slide: updatePosition(0), max: screen.width });
    webglLessonsUI.setupSlider("#y", {slide: updatePosition(1), max: screen.height});
  
    function updatePosition(index) {
      return function(event, ui) {
        translation[index] = ui.value;
        drawScene();
      };
    }
  
    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.useProgram(program);
    
        gl.enableVertexAttribArray(positionLocation);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        setRectangle(gl, translation[0], translation[1], width, height);
    
        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);
    
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    
        gl.uniform4fv(colorLocation, color);
    
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}
  
function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]),
        gl.STATIC_DRAW);
  }
  
main();