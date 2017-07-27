# Buttery.js

<img src="assets/buttery.png" alt="buttery">

_Yes, another jQuery parallax image slider..._

Buttery is a parallax image scroller which uses transforms and doesn't allow the user to scroll past the end of the image.

It creates a new element inside your selected element and sets the background. This element is then adjusted with CSS transforms.

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `parallaxSelector` | `'.parallaxInner'` | Class of the new div that gets created |
| `scale` | `1.5` | The scale of the element/image |
| `height` | `image` | How high the `parallaxSelector` box is (can be `px`, `%` or `'image'` to use the image height) |
| `scrollFraction` | `2` | What speed the scrolling effect is |

## Examples

```
$(window).on('load', function() {
	$('.banner').buttery({
		parallaxSelector: '.parallaxInner',
		scale: 1.5,
		height: 'image',
		scrollFraction: 2,
	});
});
```

## Contributing

We welcome pull requests and issues! 

If making a PR, it would be handy if you could please run `npm run dist` before committing and pushing. To run this you will need `uglifyjs` installed as a global module.

If you can't run it, don't let it put you off - we'll run it our end 😀
