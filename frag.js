precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_lightDir;
uniform vec3 u_col;
uniform mat3 uNormalMatrix;
uniform float u_pixelDensity;
uniform sampler2D u_tex;

//attributes, in
varying vec4 var_centerGlPosition;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

${frag_functions_default}

void main(){
  vec2 st = var_vertTexCoord.xy /u_resolution; 
  
  st.x += cnoise( vec3(st *${Math.random()*0.1+0.5 }*u_time +500.0, 1.) )/100.0; 
  //st.y += cnoise( vec3(st *${Math.random()*0.1+0.25 }*u_time +500.0, 1.) )/100.0; 
  
    st.y += cnoise( vec3(st *${Math.random()*0.01+0.01 }*u_time +1000.0, 0.75) )/50.0; 
  //st.x += cnoise( vec3(st *${Math.random(0.05,0.13)*0.1+0.1 }*u_time +100.0, 0.8) )/50.0; 
  
  vec3 color = vec3(0.0);
  vec4 texColor = texture2D(u_tex, st);
  gl_FragColor= vec4(color,0.0)+texColor;
}