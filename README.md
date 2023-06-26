# TypeScript Image Resizer

✨🖼️ TypeScript Image Resizer: Zero-dependency module for resizing images using DOM File object. Returns base64 encoded
string in Rust-like result object. Utilizes Canvas browser API. Effortless image magic! 🌟🎉

---

This powerful module, written entirely in TypeScript, empowers you to seamlessly resize images using the DOM `File`
object as input. With its sleek implementation, it harnesses the mighty Canvas browser API to perform image resizing
magic
behind the scenes. 🌟

🎁 Experience the simplicity and elegance as this module gracefully transforms your images, leaving you with a base64
encoded string wrapped in a Rust-like result object. It's all about efficiency and ease of use, without the hassle of
additional dependencies. 📦

Whether you're building a web application, mobile app, or a creative project, this lightweight and versatile tool will
be your go-to companion. 🎨💪

Get started today and unlock the full potential of image resizing in TypeScript! Let your creativity flow effortlessly
with the TypeScript Image Resizer. 🖌️💡

## Installation

To use the TypeScript Image Resizer in your project, simply install it via npm:

```bash
npm install sdx-resize-image
```

## Usage

The TypeScript Image Resizer provides several functions for image resizing:

```ts
export function resizeImage(img: File, width: number, height: number, quality?: number): Promise<Result<string, string>>
```

```ts
export function resizeImageWidth(img: File, width: number, quality?: number): Promise<Result<string, string>>
```

```ts
export function resizeImageHeight(img: File, height: number, quality?: number): Promise<Result<string, string>>
```

Refer to the API documentation for detailed information on each function and how to use them.

## API

`resizeImage(img: File, width: number, height: number, quality?: number): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `width` and `height` dimensions. You can also
optionally specify the `quality` of the resized image. The function returns a promise that resolves to a result object
containing the base64 encoded string of the resized image on success, or an error message on failure.

```ts
import {resizeImage} from 'sdx-resize-image';

const resizedImageResult = await resizeImage(img, 800, 600, 0.8);
if (resizedImageResult.ok) {
    const resizedImageBase64 = resizedImageResult.value;
    // Process the resized image
} else {
    const error = resizedImageResult.error;
    // Handle the error
}
```

---

`resizeImageWidth(img: File, width: number, quality?: number): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `width` while maintaining the aspect ratio. You can
also optionally specify the `quality` of the resized image. The function returns a promise that resolves to a result
object containing the base64 encoded string of the resized image on success, or an error message on failure.

```ts
import {resizeImageWidth} from 'sdx-resize-image';

const resizedImageResult = await resizeImageWidth(img, 800, 0.8);
if (resizedImageResult.ok) {
    const resizedImageBase64 = resizedImageResult.value;
    // Process the resized image
} else {
    const error = resizedImageResult.error;
    // Handle the error
}
```

---

`resizeImageHeight(img: File, height: number, quality?: number): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `height` while maintaining the aspect ratio. You can
also optionally specify the `quality` of the resized image. The function returns a promise that resolves to a result
object containing the base64 encoded string of the resized image on success, or an error message on failure.

```ts
import {resizeImageHeight} from 'sdx-resize-image';

const resizedImageResult = await resizeImageHeight(img, 600, 0.8);
if (resizedImageResult.ok) {
    const resizedImageBase64 = resizedImageResult.value;
    // Process the resized image
} else {
    const error = resizedImageResult.error;
    // Handle the error
}
```

## License

This project is licensed under the MIT License.

----

Enjoy the power and simplicity of image resizing with the TypeScript Image Resizer! If you encounter any issues or have
any suggestions, feel free to open an issue on GitHub. Contributions are also welcome! 🎉🤝
