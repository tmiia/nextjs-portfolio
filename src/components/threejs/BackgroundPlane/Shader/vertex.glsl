uniform float uTime;
uniform float uWavesElevation;
uniform vec2 uWavesFrequency;
uniform float uWavesSpeed;

varying float vElevation;
varying vec2 vUv;

void main()
{
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uWavesFrequency.x + uTime * uWavesSpeed) *
                    cos(modelPosition.y * uWavesFrequency.y + uTime * uWavesSpeed) *
                    uWavesElevation;
  modelPosition.z += elevation;


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vElevation = elevation;
}
