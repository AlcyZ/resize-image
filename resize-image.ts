/**
 * Represents a successful result value containing a value of type `T`.
 *
 * @template T - The type of the successful value.
 */
type Ok<T> = { ok: true, value: T };

/**
 * Represents an error result value containing an error value of type `E`.
 *
 * @template E - The type of the error value.
 */
type Err<E> = { ok: false, error: E };

/**
 * Represents a result type that can either hold a successful value of type `T` or an error value of type `E`.
 *
 * @template T - The type of the successful value.
 * @template E - The type of the error value.
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Creates a successful result object with the given value.
 *
 * @param value - The value representing the successful result.
 * @returns {Ok} - A successful result object containing the provided value.
 * @template T - The type of the successful value.
 */
const ok = <T>(value: T): Ok<T> => {
    return { ok: true, value };
}

/**
 * Creates an error result object with the given error.
 *
 * @param error - The error representing the unsuccessful result.
 * @returns {Err} - An error result object containing the provided error.
 * @template E - The type of the error value.
 */
const err = <E>(error: E): Err<E> => {
    return { ok: false, error };
}

/**
 * Resizes an image to specific width and height dimensions, using the provided `File` object as input.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} width - The desired width of the resized image.
 * @param {number} height - The desired height of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImage(img: File, width: number, height: number, quality?: number): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeWidthAndHeight(imageBase64, width, height, quality);
    };

    return readImageAndCall(img, callback, quality);
}

/**
 * Resizes an image to a specific width while maintaining the aspect ratio, using the provided `File` object as input.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} width - The desired width of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImageWidth(img: File, width: number, quality?: number): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeWidth(imageBase64, width, quality);
    };

    return readImageAndCall(img, callback, quality);
}

/**
 * Resizes an image to a specific height while maintaining the aspect ratio, using the provided `File` object as input.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} height - The desired height of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImageHeight(img: File, height: number, quality?: number): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeHeight(imageBase64, height, quality);
    };

    return readImageAndCall(img, callback, quality);
}

function resizeWidthAndHeight(imageBase64: string, width: number, height: number, quality?: number): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        return resize(image, width, height, quality);
    }

    return loadImageAndCall(imageBase64, callback);
}

function resizeWidth(imageBase64: string, width: number, quality?: number): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        const height = scaleHeight(image.width, image.height, width);

        return resize(image, width, height, quality);
    }

    return loadImageAndCall(imageBase64, callback);
}

function resizeHeight(imageBase64: string, height: number, quality?: number): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        const width = scaleWidth(image.width, image.height, height);

        return resize(image, width, height, quality);
    }

    return loadImageAndCall(imageBase64, callback);
}

function readImageAndCall(img: File, callback: (imageBase64: string) => Promise<Result<string, string>>, quality?: number): Promise<Result<string, string>> {
    return new Promise(resolve => {
        const isValid = validate(img, quality);
        if (!isValid) {
            resolve(isValid);
            return;
        }

        const reader = new FileReader;
        reader.addEventListener('abort', () => resolve(err('Reading image file was aborted!')));
        reader.addEventListener('error', () => resolve(err('Error while reading image file!')));
        reader.addEventListener('load', async () => {
            if (typeof reader.result !== 'string') {
                resolve(err('Loaded image file is not of type (base64) string!'));
                return;
            }

            const result = await callback(reader.result);
            resolve(result);
        });

        reader.readAsDataURL(img);
    });
}

function loadImageAndCall(imageBase64: string, callback: (image: HTMLImageElement) => Result<string, string>): Promise<Result<string, string>> {
    return new Promise(resolve => {
        const image = new Image;
        image.addEventListener('abort', () => resolve(err('Loading image with base64 string aborted!')));
        image.addEventListener('error', () => resolve(err('Error while loading image with base64 string!')));
        image.addEventListener('load', () => {
            resolve(callback(image));
        });

        image.src = imageBase64;
    });
}

function resize(image: HTMLImageElement, width: number, height: number, quality?: number): Result<string, string> {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) {
        return err('Canvas 2d context not available!');
    }
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);

    const resized = canvas.toDataURL('image/webp', quality);
    return ok(resized);
}

function scaleHeight(originalWidth: number, originalHeight: number, resizedWidth: number): number {
    return (originalHeight / originalWidth) * resizedWidth;
}

function scaleWidth(originalWidth: number, originalHeight: number, resizedHeight: number): number {
    return (originalWidth / originalHeight) * resizedHeight;
}

function validate(img: File, quality?: number): Result<undefined, string> {
    const validType = validateImageType(img);
    if (!validType.ok) {
        return validType;
    }

    return validateQuality(quality);
}

function validateImageType(file: File): Result<undefined, string> {
    if (!file.type.startsWith('image/')) {
        return err(`Invalid type (${file.type}). Only images starting with 'image/' are allowed.`);
    }

    return ok(undefined);
}

function validateQuality(quality?: number): Result<undefined, string> {
    if (quality !== undefined && (quality < 0.1 || quality > 1.0)) {
        return err(`Invalid argument 'quality' (${quality}). Value must be between 0.1 and 1.0`);
    }

    return ok(undefined);
}
