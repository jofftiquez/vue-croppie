<center><img width="200" src="http://i.imgur.com/Gt1xIqP.png"></center>

# VueCroppie

[![Join the chat at https://gitter.im/vue-croppie/Lobby](https://badges.gitter.im/vue-croppie/Lobby.svg)](https://gitter.im/vue-croppie/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

VueCroppie is a [Vue](https://vuejs.org/) 2 wrapper for [Croppie](https://foliotek.github.io/Croppie/) a beautiful photo cropping tool for Javascript by [foliotek](http://www.foliotek.com/).

# Installation

### NPM

`npm install vue-croppie --save`

### Usage

```
import Vue from 'vue';
import VueCroppie from 'vue-croppie';

Vue.use(VueCroppie);
```

# Sample 

This sample below will produce [this](https://jofftiquez.github.io/vue-croppie/).

```
<template>
    <div>
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie 
            ref=croppieRef 
            :enableOrientation="true">
        </vue-croppie>

        <!-- the result -->
        <img v-bind:src="cropped">

        <button @click="bind()">Bind</button>
        <!-- Rotate angle is Number -->
        <button @click="rotate(-90)">Rotate Left</button>
        <button @click="rotate(90)">Rotate Right</button>
        <button @click="crop()">Crop</button>
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
        rotate(rotationAngle) {
            // Rotates the image
            this.$refs.croppieRef.rotate(rotationAngle);
        }
    }
}
</script>
```

# API

All of the properties and methods are based on [Croppie documentation](https://foliotek.github.io/Croppie/). All property and method names are `"==="` the same if you know what I mean.

Except for these few things below.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ref` (required) | `Object` | `none` | `ref` is used to create a reference to the child component, in order to have access to it's methods and properties. Specific example is to access the `result()` function of `vue-croppie` from outside the component. | 
| `resultType` | `String` | `base64` | The image encoding of the cropped image via `result()`. Also available in [Croppie Documentation](https://foliotek.github.io/Croppie/). |
| `customClass` | `String` | `none` | You can pass a custom class or classes to the `props` `customClass` like `customClass="class1 class2 class3"` |

# Updates 

`1.2.x` - Result options are now being passed through the `this.$refs.croppieRef.result(options, callback)`.

# License

### MIT

Use and abuse at your own risk.

`</p>` with ❤️ by Jofferson Ramirez Tiquez