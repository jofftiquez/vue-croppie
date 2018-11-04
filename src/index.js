import {Croppie} from 'croppie';
import 'croppie/croppie.css';

const VueCroppie = {
  install(Vue, options) {
    const comp = Vue.extend({
      render(h){
        return h('div', {
          class: this.customClass,
          ref: 'croppieContainer', 
          id: 'croppieContainer', 
        })
      },
      props: {
        boundary: Object,
        customClass: String,
        enableExif: Boolean,
        enableOrientation: {
          type: Boolean,
          default: true
        },
        enableResize: {
          type: Boolean,
          default: true
        },
        enableZoom: {
          type: Boolean,
          default: true
        },
        enforceBoundary: {
          type: Boolean,
          default: true
        },
        mouseWheelZoom: {
          type: Boolean,
          default: true
        },
        showZoomer: {
          type: Boolean,
          default: true
        },
        viewport: {
          type: Object,
          default: function() {
            return {
              width: 200,
              height: 200,
              type: 'square'
            }
          }
        },
      },
      mounted() {
        this.initCroppie();
      },
      data() {
        return {
          croppie: null
        }
      },
      methods: {
        initCroppie() {
          let el = this.$refs.croppieContainer;
          
          let options = {
            enableExif: this.enableExif,
            enableOrientation: this.enableOrientation,
            enableZoom: this.enableZoom,
            enableResize: this.enableResize,
            enforceBoundary: this.enforceBoundary,
            mouseWheelZoom: this.mouseWheelZoom,
            viewport: this.viewport,
            showZoomer: this.showZoomer
          }

          if(this.boundary) {
            options.boundary = this.boundary;
          }

          el.addEventListener('update', (ev) => {
            this.$emit('update', ev.detail);
          });

          this.croppie = new Croppie(el, options);
        },
        bind(options) {
          return this.croppie.bind(options)
        },
        destroy() {
          this.croppie.destroy();
        },
        get(cb) {
          if(cb){
            cb(this.croppie.get())
          } else {
            return this.croppie.get()
          }
        },
        rotate(angle) {
          this.croppie.rotate(angle);
        },
        setZoom(value) {
          this.croppie.setZoom(value);
        },
        result(options, cb) {
          if(!options) options = {type: 'base64'}
            return this.croppie.result(options).then(output => {
              if(!cb) {
                this.$emit('result', output);
              } else {
                cb(output);
              }
              return output;
            });
        },
        refresh() {
          this.croppie.destroy();
          this.initCroppie();
        }
      }
    });
    Vue.component('vue-croppie', comp);
  }
};

export default VueCroppie;
