import { PixelCrop, centerCrop, makeAspectCrop, Crop } from 'react-image-crop';

const TO_RADIANS = Math.PI / 180
const WIDTH64 = 64, HEIGHT64 = 64;

export async function canvasPreview(
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        crop: PixelCrop,
        scale = 1,
        rotate = 0,
    ) {
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio
    // const pixelRatio = 1

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    const rotateRads = rotate * TO_RADIANS
    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2

    ctx.save()

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY)
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
    // 3) Rotate around the origin
    ctx.rotate(rotateRads)
    // 2) Scale the image
    ctx.scale(scale, scale)
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    )
    ctx.restore()
}

export async function canvasHidden(
        canvas: HTMLCanvasElement,
        hcanvas: HTMLCanvasElement
    ) {
    const hctx = hcanvas.getContext('2d');
    hcanvas.width = WIDTH64;
    hcanvas.height = HEIGHT64;
    if (hctx) {
        hctx.drawImage(
            canvas,
            0,
            0,
            canvas.width,
            canvas.height,
            0,
            0,
            WIDTH64,
            HEIGHT64
        );
    }
    return hcanvas.toDataURL('image/jpeg');
}

export function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export function customCenterCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
): Crop {
    let cropHeight, cropWidth;
    if (mediaWidth > mediaHeight) {
        cropHeight = mediaWidth / 2;
        cropWidth = cropHeight * aspect;
    } else {
        cropWidth = mediaHeight / 2;
        cropHeight = cropWidth / aspect;
    }
    return ({
        unit: "px",
        x: (mediaWidth - cropWidth) / 2,
        y: (mediaHeight - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight
    })
}
// Object { unit: "px", x: 60.515, y: 0, width: 242.97, height: 266.6666564941406 }
