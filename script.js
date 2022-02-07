function main() {
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    
    if (!gl) {
        alert("!gl occured");
        return;
    }
  
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);
    gl.useProgram(program);
  
    var positionLocation = gl.getAttribLocation(program, "a_position");
  
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var translationLocation = gl.getUniformLocation(program, "u_translation");
  
    var positionBuffer = gl.createBuffer();
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    setGeometry(gl, 0, 0);
  
    var translation = [0, 0];
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
    
        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);
    
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    
        gl.uniform4fv(colorLocation, color);
    
        gl.uniform2fv(translationLocation, translation);
    
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 18;
        gl.drawArrays(primitiveType, offset, count);
    }
}
  
function setGeometry(gl, x, y) {
    var width = 100;
    var height = 150;
    var thickness = Math.floor(Math.random() * (100 - 30 + 1) ) + 30;
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            x, y,
            x + thickness, y,
            x, y + height,
            x, y + height,
            x + thickness, y,
            x + thickness, y + height,

            x + thickness, y,
            x + width, y,
            x + thickness, y + thickness,
            x + thickness, y + thickness,
            x + width, y,
            x + width, y + thickness,

            x + thickness, y + thickness * 2,
            x + width * 2 / 3, y + thickness * 2,
            x + thickness, y + thickness * 3,
            x + thickness, y + thickness * 3,
            x + width * 2 / 3, y + thickness * 2,
            x + width * 2 / 3, y + thickness * 3,
        ]),
        gl.STATIC_DRAW);
}
  
main();