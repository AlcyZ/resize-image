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
 * The data type for the resized image.
 */
type DataType = 'image/png' | 'image/jpeg' | 'image/webp';

/**
 * The type for resolving a Promise with a Result object.
 */
type PromiseResolve = (value: Result<string, string>) => void;

/**
 * The options for image resizing.
 * @interface Options
 *
 * @property {DataType} [type] - The data type for the resized image.
 * @property {number} [width] - The desired width of the resized image.
 * @property {number} [height] - The desired height of the resized image.
 * @property {number} [quality] - The optional quality setting for the resized image.
 */
interface Options {
    type?: DataType;
    width?: number;
    height?: number;
    quality?: number;
}

/**
 * The dimensions of an image.
 * @interface Dimensions
 *
 * @property {number} width - The width of the image.
 * @property {number} height - The height of the image.
 */
interface Dimensions {
    width: number;
    height: number;
}

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
 * Resizes an image using the provided `File` object and options.
 *
 * @param {File} img - The image file to resize.
 * @param {Options} opt - The options for resizing the image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImg(img: File, opt: Options): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        const callback = (image: HTMLImageElement): Result<string, string> => {
            const dimensionsResult = getDimensions(opt, image);
            if (!dimensionsResult.ok) {
                return dimensionsResult;
            }
            const { width, height } = dimensionsResult.value;

            return resize(image, width, height, opt.quality, opt.type);
        };
        return loadImageAndCall(imageBase64, callback)
    };

    return readImageAndCallWithOpt(img, opt, callback);
}

/**
 * Resizes an image using the provided `File` object and specified width, height, quality, and type.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} width - The desired width of the resized image.
 * @param {number} height - The desired height of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @param {DataType} [type] - The optional data type for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImage(
    img: File,
    width: number,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeWidthAndHeight(imageBase64, width, height, quality, type);
    };

    return readImageAndCall(img, callback, quality);
}

/**
 * Resizes an image to a specific width while maintaining the aspect ratio, using the provided `File` object as input.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} width - The desired width of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @param {DataType} [type] - The optional data type for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImageWidth(
    img: File,
    width: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeWidth(imageBase64, width, quality, type);
    };

    return readImageAndCall(img, callback, quality);
}

/**
 * Resizes an image to a specific height while maintaining the aspect ratio, using the provided `File` object as input.
 *
 * @param {File} img - The `File` object representing the image file.
 * @param {number} height - The desired height of the resized image.
 * @param {number} [quality] - The optional quality setting for the resized image.
 * @param {DataType} [type] - The optional data type for the resized image.
 * @returns {Promise<Result<string, string>>} - A promise that resolves to a result object indicating the resizing result.
 *                                              Returns `ok(resizedDataUrl)` with the resized image data URL
 *                                              if the resizing is successful, or `err(errorMessage)` if an error occurs.
 */
export function resizeImageHeight(
    img: File,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (imageBase64: string): Promise<Result<string, string>> => {
        return resizeHeight(imageBase64, height, quality, type);
    };

    return readImageAndCall(img, callback, quality);
}

function resizeWidthAndHeight(
    imageBase64: string,
    width: number,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        return resize(image, width, height, quality, type);
    }

    return loadImageAndCall(imageBase64, callback);
}

function resizeWidth(
    imageBase64: string,
    width: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        const dimensions = { width: image.width, height: image.height };
        const height = scaleHeight(dimensions, width);

        return resize(image, width, height, quality, type);
    }

    return loadImageAndCall(imageBase64, callback);
}

function resizeHeight(
    imageBase64: string,
    height: number,
    quality?: number,
    type?: DataType
): Promise<Result<string, string>> {
    const callback = (image: HTMLImageElement): Result<string, string> => {
        const dimensions = { width: image.width, height: image.height };
        const width = scaleWidth(dimensions, height);

        return resize(image, width, height, quality, type);
    }

    return loadImageAndCall(imageBase64, callback);
}

function getDimensions(opt: Options, image: HTMLImageElement): Result<Dimensions, string> {
    if (opt.width !== undefined && opt.height !== undefined) {
        return ok({ width: opt.width, height: opt.height });
    }

    const dimensions = { width: image.width, height: image.height };
    if (opt.width !== undefined && opt.height === undefined) {
        return ok({ width: opt.width, height: scaleHeight(dimensions, opt.width) });
    }

    if (opt.width === undefined && opt.height !== undefined) {
        return ok({ width: scaleWidth(dimensions, opt.height), height: opt.height });
    }

    // should never happen if `validate` function is called before this function
    return err('Unknown dimensions due to invalid options object');
}

function readImageAndCallWithOpt(
    img: File,
    opt: Options,
    callback: (imageBase64: string) => Promise<Result<string, string>>
): Promise<Result<string, string>> {
    return new Promise(resolve => {
        const isValid = validateWithOpt(img, opt);
        if (!isValid.ok) {
            resolve(isValid);
            return;
        }

        readImageFileAndResolveCallback(img, resolve, callback);
    });
}

function readImageAndCall(
    img: File,
    callback: (imageBase64: string) => Promise<Result<string, string>>,
    quality?: number
): Promise<Result<string, string>> {
    return new Promise(resolve => {
        const isValid = validate(img, quality);
        if (!isValid.ok) {
            resolve(isValid);
            return;
        }

        readImageFileAndResolveCallback(img, resolve, callback);
    });
}

function readImageFileAndResolveCallback(
    img: File,
    resolve: PromiseResolve,
    callback: (imageBase64: string) => Promise<Result<string, string>>
) {
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
}

function loadImageAndCall(
    imageBase64: string,
    callback: (image: HTMLImageElement) => Result<string, string>
): Promise<Result<string, string>> {
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

function resize(
    image: HTMLImageElement,
    width: number,
    height: number,
    quality?: number,
    type?: DataType
): Result<string, string> {
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

    const dataType = type !== undefined ? type : 'image/png';
    const resized = canvas.toDataURL(dataType, quality);
    return ok(resized);
}

function scaleHeight(dimensions: Dimensions, resizedWidth: number): number {
    return (dimensions.height / dimensions.width) * resizedWidth;
}

function scaleWidth(dimensions: Dimensions, resizedHeight: number): number {
    return (dimensions.width / dimensions.height) * resizedHeight;
}

function validate(img: File, quality?: number): Result<undefined, string> {
    const errors: Array<string> = [];

    checkImageType(img, errors);
    checkQuality(quality, errors);

    return validateResult(errors);
}

function validateWithOpt(img: File, opt: Options): Result<undefined, string> {
    const errors: Array<string> = [];

    checkImageType(img, errors);
    checkOptions(opt, errors);

    return validateResult(errors);
}

function validateResult(errors: Array<string>): Result<undefined, string> {
    if (errors.length > 0) {
        const msg = errors.join(' - ');

        return err(msg);
    }

    return ok(undefined);
}

function checkOptions(opt: Options, errors: Array<string>): void {
    if (opt.width === undefined && opt.height === undefined) {
        errors.push('Either width or height must be set');
    }

    checkQuality(opt.quality, errors);
}

function checkImageType(img: File, errors: Array<string>): void {
    if (!img.type.startsWith('image/')) {
        errors.push(`Invalid type (${img.type}). Only images starting with 'image/' are allowed.`);
    }
}

function checkQuality(quality: number | undefined, errors: Array<string>): void {
    if (quality !== undefined && (quality < 0.1 || quality > 1.0)) {
        errors.push(`Invalid argument 'quality' (${quality}). Value must be between 0.1 and 1.0`);
    }
}
