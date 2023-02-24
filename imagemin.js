import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

await imagemin(["_assets/img/*.{jpg,png}"], {
  destination: "_assets/img",
  plugins: [imageminWebp({ quality: 100 })],
});

console.log("Images optimized");
