import Croppie from 'croppie'
import 'croppie/croppie.css'

const VueCroppie = {
    install(Vue, options) {
        const comp = {
            render(h){
                return h('div', {ref: 'croppieContainer', id: 'croppieContainer'})
            },
            mounted() {
                this.initCroppie();
            },
            props: {
                cropSrc: null,
                cropped: null,
                croppie: null,
            },
            methods: {
                initCroppie() {
                    let el = this.$refs.croppieContainer;
                    this.croppie = new Croppie(el, {
                        enableOrientation: true,
                        viewport: {
                            width: 250,
                            height: 250,
                        },
                        boundary: {
                            width: this.cropperWidth,
                            height: 400
                        },
                        showZoomer: false,
                    })
                    this.croppie.bind(this.cropSrc)
                },
                crop() {
                    this.croppie.result('base64').then(output => {
                        this.$emit('on_crop', output)
                    })
                }
            }
        }
        Vue.component('vue-coppie', comp)
    }
};

export default VueCroppie;