![Black Lives Matter](./black-lives-matter.png)

# [#BlackLivesMatter!](https://twitter.com/search?q=%23BlackLivesMatter&src=typed_query)

> https://blacklivesmatter.com/

> [Black Lives Matter Movement Resources](https://github.com/FrancescoXX/Black-Lives-Matter-Resources)

-----

<center><img width="200" src="http://i.imgur.com/Gt1xIqP.png"></center>

# VueCroppie

[![Join the chat at https://gitter.im/vue-croppie/Lobby](https://badges.gitter.im/vue-croppie/Lobby.svg)](https://gitter.im/vue-croppie/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) <span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/jofftiquez" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-green.svg" alt="Buy Me A Coffee donate button" /></a></span>
  <span>
    <a href="https://www.npmjs.com/package/vue-croppie" title="NPM">
      <img src="https://img.shields.io/npm/dt/vue-croppie.svg?style=shield" alt="NPM"/>
    </a>
  </span>

VueCroppie is a [Vue](https://vuejs.org/) 2 wrapper for [Croppie](https://foliotek.github.io/Croppie/) a beautiful photo cropping tool for Javascript by [foliotek](http://www.foliotek.com/).

If you like this project, please give it a star, and consider following the author. :)

# Installation

### NPM

```bash
npm install vue-croppie --save
```

### CDN
`https://unpkg.com/vue-croppie/dist/vue-croppie.js`

### Usage with a bundler
TO use VueCroppie with Webpack, Parcel or other bundler

```js
import Vue from 'vue';
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually

Vue.use(VueCroppie);
```

### Usage in Browser directly
```html
<script src="https://unpkg.com/vue-croppie/dist/vue-croppie.js"></script>
<link rel="stylesheet" href="https://unpkg.com/croppie/croppie.css">
<body>
  ...
</body>
<script>
  const vm = new Vue({...});
</script>
```

# Sample 

This sample below will produce [this](https://jofftiquez.github.io/vue-croppie/).

```vue
<template>
    <div>
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie 
            ref="croppieRef" 
            :enableOrientation="true"
            :boundary="{ width: 300, height: 300}"
            @result="result"
            @update="update">
        </vue-croppie>

        <!-- the result -->
        <img v-bind:src="cropped">

        <button @click="bind()">Bind</button>
        <!-- Rotate angle is Number -->
        <button @click="rotate(-90)">Rotate Left</button>
        <button @click="rotate(90)">Rotate Right</button>
        <button @click="crop()">Crop Via Callback</button>
        <button @click="cropViaEvent()">Crop Via Event</button>
    </div>
</template>

<script>
export default {
    mounted() {
        // Upon mounting of the component, we accessed the .bind({...})
        // function to put an initial image on the canvas.
        this.$refs.croppieRef.bind({
            url: 'http://i.imgur.com/Fq2DMeH.jpg',
        })
    },
    data() {
        return {
            cropped: null,
            images: [
                'http://i.imgur.com/fHNtPXX.jpg',
                'http://i.imgur.com/ecMUngU.jpg',
                'http://i.imgur.com/7oO6zrh.jpg',
                'http://i.imgur.com/miVkBH2.jpg'
            ]
        }
    },
    methods: {
        bind() {
            // Randomize cat photos, nothing special here.
            let url = this.images[Math.floor(Math.random() * 4)]

            // Just like what we did with .bind({...}) on 
            // the mounted() function above.
            this.$refs.croppieRef.bind({
                url: url,
            });
        },
        // CALBACK USAGE
        crop() {
            // Here we are getting the result via callback function
            // and set the result to this.cropped which is being 
            // used to display the result above.
            let options = {
                format: 'jpeg', 
                circle: true
            }
            this.$refs.croppieRef.result(options, (output) => {
                this.cropped = output;
            });
        },
        // EVENT USAGE
        cropViaEvent() {
            this.$refs.croppieRef.result(options);
        },
        result(output) {
            this.cropped = output;
        },
        update(val) {
            console.log(val);
        },
        rotate(rotationAngle) {
            // Rotates the image
            this.$refs.croppieRef.rotate(rotationAngle);
        }
    }
}
</script>
```

### File Upload Sample
You can upload file instead of using direct image link.
*Usage*
In your form add a `file input` along with `vue-croppie` component.
```vue
<template>
  <input type="file" @change="croppie"/>
  <vue-croppie ref="croppieRef" :enableOrientation="true" :boundary="{ width: 450, height: 300}" :viewport="{ width:400, height:250, 'type':'square' }">
  </vue-croppie>
  <!-- the result -->
  <img :src="cropped">
  <button @click="crop">Crop</button>
</template>

<script>
export default {
  data() {
    return {
      croppieImage: '',
      cropped: null
    };
  },
  methods: {
    croppie (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = e => {
        this.$refs.croppieRef.bind({
          url: e.target.result
        });
      };

    reader.readAsDataURL(files[0]);
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: 'base64',
        size: { width: 600, height: 450 },
        format: 'jpeg'
      };
      this.$refs.croppieRef.result(options, output => {
        this.cropped = this.croppieImage = output;
          console.log(this.croppieImage);
        });
      }
  }
};
```

### Using Options

All [Croppie options](https://foliotek.github.io/Croppie/) were converted to props to be able use them in the `vue-croppie` component.

*Usage*
```html
<vue-croppie
    ref=croppieRef
    :enableOrientation="true"
    :mouseWheelZoom="false"
    :viewport="{ width: 200, height: 200, type: 'circle' }"
    @result="fn"
>
</vue-croppie>
```

# API

All of the properties and methods are based on [Croppie documentation](https://foliotek.github.io/Croppie/). All property and method names are `"==="` the same if you know what I mean.

Except for these few things below.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ref` (required) | `Object` | `none` | `ref` is used to create a reference to the child component, in order to have access to it's methods and properties. Specific example is to access the `result()` function of `vue-croppie` from outside the component. | 
| `resultType` | `String` | `base64` | The image encoding of the cropped image via `result()`. Also available in [Croppie Documentation](https://foliotek.github.io/Croppie/). |
| `customClass` | `String` | `none` | You can pass a custom class or classes to the `props` `customClass` like `customClass="class1 class2 class3"` |

# Events

| Option | Type | Usage | Description |
|--------|------|---------|-------------|
| `update` | function | `@update="fn"` | Gets triggered when the croppie element has been zoomed, dragged or cropped  |
| `result` | function | `@result="fn"` | Gets triggered when the image has been cropped. Returns the cropped image. |
| `croppieInitialized` | function | `@croppieInitialized="fn"` | Gets triggered when the croppie gets initialized. |

*Note:*

`@result` event is only available if **NO callback function was passed** to `this.$refs.croppieRef.result({})`. See [here](https://github.com/jofftiquez/vue-croppie/blob/3046d96588ccc992d23f9a541eddd504326946d0/src/index.js#L104)


# FAQ

**How to clear/destroy coppie?** 

I added a new method called `refresh()` and can be used as `this.$refs.croppieRef.refresh()`, but the croppie instance is now being refreshed automatically after every `crop()` invocation. 

*Helpful links*
[#358](https://github.com/Foliotek/Croppie/issues/352) - Official croppie page.

# Updates 

**1.3.0 - Aug 16, 2017**
- Added webpack build
- Fixes #5
- Fixes #14

**1.2.5 - Aug 12, 2017**
- Cropped image output can now be retrieve via vue event.
- Added `result` event.
- Added `updated` event.

**1.2.3**
- Added automatic refreshing of `croppie` instance after every `crop()` invocation.
- New method `refresh()` which destroys and re-create the croppie instance.

**1.2.x**
- Result options are now being passed through the `this.$refs.croppieRef.result(options, callback)`.

# License

### MIT

Use and abuse at your own risk.

`</p>` with ❤️ by Jofferson Ramirez Tiquez
