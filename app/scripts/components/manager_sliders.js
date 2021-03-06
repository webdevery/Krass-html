import Sketch from "./sliders/mainSketch";
import $ from "jquery";
import Swiper from "swiper";

export default class Manager_sliders {
  constructor() {
    this.init();
  }
  init() {
    if ($("#imgs-content").length > 0 && $(window).width() > 768) this.sketch();
    if ($("#product-slider").length > 0) this.productSlider();
  }
  sketch() {
    let sketch = new Sketch({
      debug: true,
      uniforms: {
        intensity: { value: 0.2, type: "f", min: 0, max: 2 },
      },
      fragment: `
        uniform float time;
        uniform float progress;
        uniform float intensity;
        uniform float width;
        uniform float scaleX;
        uniform float scaleY;
        uniform float transition;
        uniform float radius;
        uniform float swipe;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        mat2 getRotM(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat2(c, -s, s, c);
        }
        const float PI = 3.1415;
        const float angle1 = PI *0.25;
        const float angle2 = -PI *0.75;
    
    
        void main()	{
          vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    
          vec4 disp = texture2D(displacement, newUV);
          vec2 dispVec = vec2(disp.r, disp.g);
    
          vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
          vec4 t1 = texture2D(texture1, distortedPosition1);
    
          vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
          vec4 t2 = texture2D(texture2, distortedPosition2);
    
          gl_FragColor = mix(t1, t2, progress);
    
        }
    
      `,
    });
  }
  productSlider() {
    var mySwiper = new Swiper('#product-slider', {
      slidesPerView: 1,
      effect: 'fade',
      speed: 600,
      thumbs: {
        swiper: {
          el: '#product-preview',
          grabCursor: false,
          slidesPerView: 5,
          spaceBetween: 15,
          direction: 'vertical',
          breakpoints: {
            769: {
              spaceBetween: 30
            },
          }
        }
      }
    });
  }
}
