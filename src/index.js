import "./styles.css";
import { initShaders } from "../lib/cuon-utils";
import { Matrix4, Vector3 } from "../lib/cuon-matrix-cse160";

// Vertex shader program
const VSHADER_SOURCE = `
  attribute vec2 a_Position;
  attribute vec3 a_Color;
  varying vec3 v_Color;
  void main() {
    v_Color = a_Color;
    gl_Position = vec4(a_Position, 0.0, 1.0);
  }
`;

// Fragment shader program
const FSHADER_SOURCE = `
precision mediump float;
varying vec3 v_Color;
void main() {
  gl_FragColor = vec4(v_Color, 1.0);
}`;

// Retrieve <canvas> element
var canvas = document.getElementById("webgl");

// Get the rendering context for WebGL
var gl = canvas.getContext("webgl");
if (!gl) {
  console.log("Failed to get the rendering context for WebGL");
}

// Initialize shaders
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log("Failed to initialize shaders.");
}
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Define vertices and colors
let vertices = new Float32Array([
  // Vertex 1: position (x, y) + color (r, g, b)
  -1,
  -1,
  1.0,
  0.0,
  0.0, // Red
  // Vertex 2: position (x, y) + color (r, g, b)
  1,
  -1,
  1.0,
  0.0,
  0.0, // Green
  // Vertex 3: position (x, y) + color (r, g, b)
  0,
  1,
  1.0,
  0.0,
  0.0, // Blue
]);

let a_Position = gl.getAttribLocation(gl.program, "a_Position");
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 20, 0);
gl.enableVertexAttribArray(a_Position);

let a_Color = gl.getAttribLocation(gl.program, "a_Color");
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 20, 8);
gl.enableVertexAttribArray(a_Color);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.drawArrays(gl.TRIANGLES, 0, 3);

// let colors = new Float32Array([
//   // Vertex colors
//   1.0,
//   0.0,
//   0.0, // Vertex 1 (red)
//   1,
//   0,
//   0.0, // Vertex 2 (green)
//   1,
//   0,
//   0, // Vertex 3 (blue)
// ]);
// // Get attribute locations
// let a_Position = gl.getAttribLocation(gl.program, "a_Position");
// let a_Color = gl.getAttribLocation(gl.program, "a_Color");

// // Create buffer for vertices
// const vertexBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// // Assign buffer to attributes
// gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(a_Position);

// // Create buffer for colors
// const colorBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// // Assign buffer to color attribute
// gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(a_Color);

// // Draw the triangle
// gl.drawArrays(gl.TRIANGLES, 0, 3);
