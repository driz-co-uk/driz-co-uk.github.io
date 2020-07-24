---
layout: note
title: Fluid Typography.
date: 1992-01-01
excerpt: >
  In the modern world of responsive web design we have devices ranging from watches to televisions, and as more devices with varying screen sizes appear on the market, specifying a font size for each 'breakpoint' isn't a feasible approach going forward... introducing Fluid Typography!
---

If you follow the mobile-first practice of responsive web design, you'll likely end up with something like the following when specifying your font sizes for the different devices your site is viewed on.

```css
.element {
    font-size: 16px;
}

/* tablets */
@media (min-width: 768px) {
    .element {
        font-size: 20px;
    }
}

/* desktops */
@media (min-width: 992px) {
    .element {
        font-size: 24px;
    }
}

/* xl desktops */
@media (min-width: 1200px) {
    .element {
        font-size: 28px;
    }
}
```

But those breakpoints jump quite a bit and our fonts jump too... what if we wanted our text to only increase a little bit or better yet we want our text to be relative to the actual screen size?

Here I'll show two ways to great fluid typography, but first let's talk about the two things needed `vw` and `calc`.

### The `vw` unit.

`vw` allows us to specify a size relative to the viewport width.

`1vw` is equal to `1%` of the width of the viewport's initial containing block. So if the current viewport is `768px` wide then `1vw` would be equal to: `7.68px` at this width.

So if we want to have `16px` as our font size we'd use: `2.08vw`.

```css
.element {
    font-size: 2.08vw;
}
```

As you resize your browser you'll see the font size increase and decrease... magic!

However what you'll find is that the font becomes either too small or too big depending on the screen size.

What we want is this fluid behaviour but with some control over a minimum and maximum size and forget all about the different possible 'breakpoints' in between and let the computer work out the maths.

### The `calc` function.

`calc` allows us to make the browser to work out a value in real-time using maths.

Using `calc` we can can write a simple math equation to devise a value taking into account the current viewport width, viewport thresholds, and most importantly a maximum and minimum size.

`[min value] + ([max value] - [min value]) * (([current viewport width] - [min viewport width]) / ([max viewport width] - [min viewport width]))
`

It might look quite scary but it's actually quite simple. Let's break that down!

First we want to work out our font size difference increment value:

`[min value] + ([max value] - [min value])`

We will then multiply this value against the viewport width (taking into account our thresholds).

Nex we want to work out the current viewport minus the minium viewport threshold to get the difference:

`([current viewport width] - [min viewport width])`

And then we divide this width by the difference between our maximum and minimum thresholds:

`([max viewport width] - [min viewport width])`

So for example if we want our smallest `font-size` to be `16px` and our largest to be `32px`, and we want this to be the case between `320px` and `1200px` viewports:

```scss
.element {
    font-size: calc(16px + (32 - 16) * ((100vw - 320px) / (1200 - 320)));
}
```

Note the use of `100vw` which gives us our current viewport width in real-time.

### Sass mixin.

Here's a handy Sass mixin that will work out the maths for us by passing just the values we want.

```scss
@function strip-unit($value) {
    @return $value / ($value * 0 + 1);
}

@function diff($value1, $value2) {
    @return #{strip-unit($value2 - $value1)};
}

@mixin fluid-value($property, $min-value, $max-value, $min-viewport-width, $max-viewport-width) {
    #{$property}: calc(#{$min-value} + #{diff($min-value, $max-value)} * ((100vw - #{$min-viewport-width}) / #{diff($min-viewport-width, $max-viewport-width)}));
}
```

Now it's as simple as using:

```scss
.element {
    @include fluid-value('font-size', 16px, 32px, 320px, 1200px);
}
```

However you want to make sure you have values for below and above your viewport widths:

```scss
@mixin fluid-typography(
    $min-font-size,
    $max-font-size,
    $min-viewport-width: '320px',
    $max-viewport-width: '1200px') {

    /* minimum */
    @media (max-width: #{strip-unit($min-viewport-width)-1}px) {
        font-size: $min-font-size;
    }

    /* fluid between minimum and maximum */
    @media (min-width: $min-viewport-width) and (max-width: #{strip-unit($max-viewport-width)-1}px) {
        @include fluid-value('font-size', $min-font-size, $max-font-size, $min-viewport-width, $max-viewport-width);
    }

    /* maximum */
    @media (min-width: $max-viewport-width) {
        font-size: $max-font-size;
    }
}
```

And then used as:

```scss
.element {
    @include fluid-typography(16px, 32px, 320px, 1200px);
}
```

Or if you're happy with the default breakpoint thresholds:

```scss
.element {
    @include fluid-typography(16px, 32px);
}
```

## Alternative

```scss
body {
    font-size: calc(1em + .9vw);
}

.element {
    font-size: 1rem; // 100%;
}
```


### Browser support.

At the time of writing (2020) crappy browser support is still a thing... *cough* IE *cough*.

However both `vw` and `calc` have good support:

[https://caniuse.com/#feat=mdn-css_types_length_vw](https://caniuse.com/#feat=mdn-css_types_length_vw){:target="_blank"}

[https://caniuse.com/#feat=calc](https://caniuse.com/#feat=calc){:target="_blank"}