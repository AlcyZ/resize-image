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
export function resizeImg(
    img: File,
    opt: Options
): Promise<Result<string, string>> { /* ... */ }
```

```ts
export function resizeImage(
    img: File,
    width: number,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> { /* ... */ }
```

```ts
export function resizeImageWidth(
    img: File,
    width: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> { /* ... */ }
```

```ts
export function resizeImageHeight(
    img: File,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> { /* ... */ }
```

You can decide if you prefer the concrete functions for image resizing or the flexible approach using an options
object to control the outcome. Invalid usage results in an error result describing the wrong usage.  
Refer to the [API](https://github.com/AlcyZ/resize-image#api) documentation for detailed information on each function
and how to use them.

## API

`resizeImg(img: File, opt: Options): Promise<Result<string, string>>`

A function that allows you to resize an image file with flexible options.

#### Parameters

- img (required): The image file to be resized.
- opt (required): An object containing options for image resizing. The options include:
    - type (optional): The desired data type of the resized image. Supported values are 'image/png', 'image/jpeg', and '
      image/webp'. If not provided, the default data type is 'image/png'.
    - width (optional): The desired width of the resized image in pixels.
    - height (optional): The desired height of the resized image in pixels.
    - quality (optional): The desired quality of the resized image. This value should be a number between 0 and 1, where
      1 represents the highest quality. If not provided, the default quality is used.

At least `width` or `height` must be set in the options. If none is present, the validation fails and returns an error
result.

#### Return Value

A promise that resolves to a Result object. The Result object represents the outcome of the image resizing operation and
contains either the resized image as a base64-encoded string (ok property) or an error message (err property).

#### Example

```ts
import {resizeImg} from 'sdx-resize-image';

const opt = {
    width: 800,
    height: 600,
    quality: 0.8,
    type: 'image/webp'
}
const resizedImageResult = await resizeImg(img, opt);
if (resizedImageResult.ok) {
    const resizedImageBase64 = resizedImageResult.value;
    // Process the resized image
} else {
    const error = resizedImageResult.error;
    // Handle the error
}
```

---

`resizeImage(img: File, width: number, height: number, quality?: number, type?: DataType): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `width` and `height` dimensions. You can also
optionally specify the `quality` and `type` of the resized image. The function returns a promise that resolves to a
result object containing the base64 encoded string of the resized image on success, or an error message on failure.

#### Example

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

`resizeImageWidth(img: File, width: number, quality?: number, type?: DataType): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `width` while maintaining the aspect ratio. You can
also optionally specify the `quality` and `type` of the resized image. The function returns a promise that resolves to a
result object containing the base64 encoded string of the resized image on success, or an error message on failure.

#### Example

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

`resizeImageHeight(img: File, height: number, quality?: number, type?: DataType): Promise<Result<string, string>>`

Resizes the image specified by the `img` file object to the desired `height` while maintaining the aspect ratio. You can
also optionally specify the `quality` and `type` of the resized image. The function returns a promise that resolves to a
result object containing the base64 encoded string of the resized image on success, or an error message on failure.

#### Example

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

This project is licensed under the [MIT](https://github.com/AlcyZ/resize-image/blob/main/LICENSE) License.

----

Enjoy the power and simplicity of image resizing with the TypeScript Image Resizer! If you encounter any issues or have
any suggestions, feel free to open an issue on [GitHub](https://github.com/AlcyZ/resize-image/issues). Contributions are
also welcome! 🎉🤝
