import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";

await imagemin(["assets/img/*.{jpg,png}"], {
  destination: "_assets/img",
  plugins: [
    imageminJpegtran({
      progressive: true,
      arithmetic: true,
    }),
    imageminPngquant({
      quality: [0.6, 0.8],
    }),
  ],
});

await imagemin(["assets/img/*.{jpg,png}"], {
  destination: "_assets/img",
  plugins: [
    imageminWebp({
      quality: 80,
    }),
  ],
});

console.log("Images optimized");
