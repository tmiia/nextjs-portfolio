uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {

  float mixStrenght = (vElevation + uColorOffset) * uColorMultiplier;
  vec3 color = mix(uColor1, uColor2, mixStrenght);

  gl_FragColor = vec4(color, 1.0);
   #include <colorspace_fragment>
}
