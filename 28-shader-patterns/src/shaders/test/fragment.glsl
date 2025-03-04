#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    // Pattern 1
    // vec3 color = vec3(vUv, 1.0);

    // Pattern 2
    // vec3 color = vec3(vUv, 0.0);

    // Pattern 3
    // vec3 color = vec3(vUv.x);

    // Pattern 4
    // vec3 color = vec3(vUv.y);

    // Pattern 5
    // vec3 color = vec3(1.0 - vUv.y);

    // Pattern 6
    // vec3 color = vec3(vUv.y * 10.0);

    // Pattern 7
    // vec3 color = vec3(mod(vUv.y * 10.0, 1.0));

    // Pattern 8
    // vec3 color = vec3(step(0.5, mod(vUv.y * 10.0, 1.0)));

    // Pattern 9
    // vec3 color = vec3(step(0.8, mod(vUv.y * 10.0, 1.0)));

    // Pattern 10
    // vec3 color = vec3(step(0.8, mod(vUv.x * 10.0, 1.0)));

    // Pattern 11
    // vec3 color = vec3(
    //     step(0.8, mod(vUv.x * 10.0, 1.0)) +
    //     step(0.8, mod(vUv.y * 10.0, 1.0))
    // );

    // Pattern 12
    // vec3 color = vec3(
    //     step(0.8, mod(vUv.x * 10.0, 1.0)) *
    //     step(0.8, mod(vUv.y * 10.0, 1.0))
    // );

    // Pattern 13
    // vec3 color = vec3(
    //     step(0.4, mod(vUv.x * 10.0, 1.0)) *
    //     step(0.8, mod(vUv.y * 10.0, 1.0))
    // );

    // Pattern 14
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // vec3 color = vec3(barX + barY);

    // Pattern 15
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // vec3 color = vec3(barX + barY);

    // Pattern 16
    // vec3 color = vec3(abs(vUv.x - 0.5));

    // Pattern 17
    // vec3 color = vec3(min(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // Pattern 18
    // vec3 color = vec3(max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // Pattern 19
    // vec3 color = vec3(step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))));

    // Pattern 20
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // vec3 color = vec3(square1 * square2);

    // Pattern 21
    // vec3 color = vec3(floor(vUv.x * 10.0) / 10.0);

    // Pattern 22
    // vec3 color = vec3(
    //     floor(vUv.x * 10.0) / 10.0 *
    //     floor(vUv.y * 10.0) / 10.0
    // );

    // Pattern 23
    // vec3 color = vec3(random(vUv));

    // Pattern 24
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0) / 10.0
    // );
    // vec3 color = vec3(random(gridUv));

    // Pattern 25
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
    // );
    // vec3 color = vec3(random(gridUv));

    // Pattern 26
    // vec3 color = vec3(length(vUv));

    // Pattern 27
    // vec3 color = vec3(length(vUv - 0.5));
    // vec3 color = vec3(distance(vUv, vec2(0.5)));

    // Pattern 28
    // vec3 color = vec3(1.0 - distance(vUv, vec2(0.5)));

    // Pattern 29
    // vec3 color = vec3(0.015 / distance(vUv, vec2(0.5)));

    // Pattern 30
    // vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    // vec3 color = vec3(0.015 / distance(lightUv, vec2(0.5)));

    // Pattern 31
    // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // vec3 color = vec3(lightX * lightY);

    // Pattern 32
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // vec2 lightUvX = vec2(rotatedUv.x * 0.1 + 0.45, rotatedUv.y * 0.5 + 0.25);
    // vec2 lightUvY = vec2(rotatedUv.y * 0.1 + 0.45, rotatedUv.x * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // vec3 color = vec3(lightX * lightY);

    // Pattern 33
    // vec3 color = vec3(step(0.25, distance(vUv, vec2(0.5))));

    // Pattern 34
    // vec3 color = vec3(abs(distance(vUv, vec2(0.5)) - 0.25));

    // Pattern 35
    // vec3 color = vec3(step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)));

    // Pattern 36
    // vec3 color = vec3(1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)));

    // Pattern 37
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // vec3 color = vec3(1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)));

    // Pattern 38
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // vec3 color = vec3(1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)));

    // Pattern 39
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // vec3 color = vec3(1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)));

    // Pattern 40
    // vec3 color = vec3(atan(vUv.x, vUv.y));

    // Pattern 41
    // vec3 color = vec3(atan(vUv.x - 0.5, vUv.y - 0.5));

    // Pattern 42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // vec3 color = vec3(angle);

    // Pattern 43
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // angle *= 20.0;
    // angle = mod(angle, 1.0);
    // vec3 color = vec3(angle);

    // Pattern 44
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // vec3 color = vec3(sin(angle * 100.0));

    // Pattern 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float radius = 0.25 + sin(angle * 100.0) * 0.02;
    // vec3 color = vec3(1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius)));

    // Pattern 46
    // vec3 color = vec3(cnoise(vUv * 10.0));

    // Pattern 47
    // vec3 color = vec3(step(0.0, cnoise(vUv * 10.0)));

    // Pattern 48
    // vec3 color = vec3(1.0 - abs(cnoise(vUv * 10.0)));

    // Pattern 49
    // vec3 color = vec3(sin(cnoise(vUv * 10.0) * 20.0));

    // Pattern 50
    vec3 color = vec3(step(0.9, sin(cnoise(vUv * 10.0) * 20.0)));

    // Clamp the strength
    color = vec3(clamp(color.x, 0.0, 1.0));

    // Black and white version
    // gl_FragColor = vec4(color, 1.0);

    // Colored version
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, color.x);
    gl_FragColor = vec4(mixedColor, 1.0);
}
