varying vec2 vUV;
varying float displacement;

void main()
{
    float brightness = (displacement) * 0.05;
    float alpha = brightness * 0.25;
    gl_FragColor = vec4(brightness, brightness, brightness, alpha);
}