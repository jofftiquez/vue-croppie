import Croppie from 'croppie';

var VueCroppieComponent = {
  name: 'VueCroppie',
  render: function render(h) {
    return h('div', {
      class: this.customClass,
      ref: 'croppieContainer',
      id: 'croppieContainer'
    });
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
      type: [Boolean, String],
      default: true
    },
    showZoomer: {
      type: Boolean,
      default: true
    },
    croppieInitialized: {
      type: Function,
      default: function _default() {}
    },
    viewport: {
      type: Object,
      default: function _default() {
        return {
          width: 200,
          height: 200,
          type: 'square'
        };
      }
    },
    minZoom: Number,
    maxZoom: Number
  },
  mounted: function mounted() {
    this.initCroppie();
  },
  data: function data() {
    return {
      croppie: null
    };
  },
  methods: {
    initCroppie: function initCroppie() {
      var _this = this;

      var el = this.$refs.croppieContainer;
      var options = {
        enableExif: this.enableExif,
        enableOrientation: this.enableOrientation,
        enableZoom: this.enableZoom,
        enableResize: this.enableResize,
        enforceBoundary: this.enforceBoundary,
        mouseWheelZoom: this.mouseWheelZoom,
        viewport: this.viewport,
        showZoomer: this.showZoomer,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      };

      if (this.boundary) {
        options.boundary = this.boundary;
      }

      el.addEventListener('update', function (ev) {
        _this.$emit('update', ev.detail);
      });
      this.croppie = new Croppie(el, options);
      this.croppieInitialized();
    },
    bind: function bind(options) {
      return this.croppie.bind(options);
    },
    destroy: function destroy() {
      this.croppie.destroy();
    },
    get: function get(cb) {
      if (cb) {
        cb(this.croppie.get());
      } else {
        return this.croppie.get();
      }
    },
    rotate: function rotate(angle) {
      this.croppie.rotate(angle);
    },
    setZoom: function setZoom(value) {
      this.croppie.setZoom(value);
    },
    result: function result(options, cb) {
      var _this2 = this;

      if (!options) options = {
        type: 'base64'
      };
      return this.croppie.result(options).then(function (output) {
        if (!cb) {
          _this2.$emit('result', output);
        } else {
          cb(output);
        }

        return output;
      });
    },
    refresh: function refresh() {
      this.croppie.destroy();
      this.initCroppie();
    }
  }
};

var VueCroppie = {
  install: function install(Vue, options) {
    Vue.component(VueCroppieComponent.name, VueCroppieComponent);
  }
};

if (window && window.Vue) {
  Vue.use(VueCroppie);
}

export default VueCroppie;
export { VueCroppieComponent };
