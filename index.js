import Croppie from 'croppie'
import 'croppie/croppie.css'

const VueCroppie = {
  install(Vue, options) {
  	Vue.mixin({
      mounted() {
        console.log('Mounted!');
      }
    });
  }
};

export default VueCroppie;