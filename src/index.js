import VueCroppieComponent from './VueCroppieComponent'

const VueCroppie = {
  install (Vue, options) {
    Vue.component(VueCroppieComponent.name, VueCroppieComponent)
  }
}

if (window && window.Vue) {
  Vue.use(VueCroppie)
}

export default VueCroppie
export { VueCroppieComponent }