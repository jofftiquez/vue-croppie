import Croppie from 'croppie';
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
            mounted() {
                this.initCroppie();
            },
            props: {
                boundary: {
                    type: Object,
                    default: function() {
                        return {
                            width: 400,
                            height: 400
                        }
                    }
                },
                customClass: String,
                enableExif: Boolean,
                enableOrientation: Boolean,
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
            data() {
                return {
                    croppie: null
                }
            },
            methods: {
                initCroppie() {
                    let el = this.$refs.croppieContainer;
                    
                    el.addEventListener('update', (ev) => {
                        this.$emit('update', ev.detail);
                    });

                    this.croppie = new Croppie(el, {
                        boundary: this.boundary,
                        enableExif: this.enableExif,
                        enableOrientation: this.enableOrientation,
                        enableZoom: this.enableZoom,
                        enforceBoundary: this.enforceBoundary,
                        mouseWheelZoom: this.mouseWheelZoom,
                        viewport: this.viewport,
                        showZoomer: this.showZoomer
                    });
                },
                bind(options) {
                    this.croppie.bind(options)
                },
                destroy() {
                    this.croppie.destroy();
                },
                get(cb) {
                    cb(this.croppie.get())
                },
                rotate(angle) {
                    this.croppie.rotate(angle);
                },
                setZoom(value) {
                    this.croppie.setZoom(value);
                },
                result(options, cb) {
                    if(!options) options = {type: 'base64'}
                    this.croppie.result(options).then(output => {
                        if(!cb) {
                            this.$emit('result', output);
                        } else {
                            cb(output);
                        }
                        this.refresh();
                    });
                },
                refresh() {
                    this.croppie.destroy();
                    this.initCroppie();
                }
            }
        });
        Vue.component('vue-croppie', comp)
    }
};

export default VueCroppie;