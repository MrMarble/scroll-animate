# scroll-animate

Simple VanillaJS library to create a animation with the scroll as the time-controller


## Usage

```HTML
<!-- Importing the library-->
<script src="scrollAnimate.min.js">

<script>
  scrollAnimate({
        frames: {
            path: '/frames/',
            prefix: 'frame_',
            extension: 'jpg',
            amount: 40,
            pad:'00' // Optional
        },
        parent: '#animation',
        scroll: {
            start: 0,
            length: 500
        }
    });
</script>
```
