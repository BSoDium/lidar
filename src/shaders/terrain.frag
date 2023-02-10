varying vec2 vUV;
varying float displacement;

void main()
{
    float brightness = displacement * 0.5;
    float alpha = displacement;
    gl_FragColor = vec4(brightness * 0.95, brightness, brightness, alpha);
}