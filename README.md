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
## Examples

You have one simple and ugly example in the examples folder

# WIP
This library is functional but I'm still working on it so it is not safe to use in production (even I dont think anyone will ever).

Feel free to try and contribute