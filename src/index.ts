import { Convertor, v2, Vector2 } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js'
import { Maths } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js'
/**
 * Draw a capsule 
 */
export function drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void {
	// Always maintain a positive direction
	const dr = y1 == y2 && x1 > x2 ? -1 : 1
	const p1 = v2(x1, y1)
	const p2 = v2(x2, y2)
	const p3 = v2(p2.x - p1.x, p2.y - p1.y)
	const xAxis = v2(1, 0)
	const ang = Vector2.includedAngle(p3, xAxis) * -1 + 90 * dr
	const rad = Maths.degreeToRad(ang)
	this.beginPath()
	this.arc(x1, y1, radius, 0 + rad, Math.PI + rad)
	this.arc(x2, y2, radius, Math.PI + rad, rad)
	this.closePath()
	this.stroke()
	this.fill()
}
/**
 * Invert image color
 */
export function inverseColor(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number) {
	x ??= 0
	y ??= 0
	w ??= this.canvas.width
	h ??= this.canvas.height
	const imageData = this.getImageData(x, y, w, h)
	for (let x = 0; x < imageData.width; x++) {
		for (let y = 0; y < imageData.height; y++) {
			const idx = (x + y * imageData.width) * 4
			imageData.data[idx + 0] = 255 - imageData.data[idx + 0]
			imageData.data[idx + 1] = 255 - imageData.data[idx + 1]
			imageData.data[idx + 2] = 255 - imageData.data[idx + 2]
			imageData.data[idx + 3] = 255
		}
	}
	this.putImageData(imageData, x, y)
}
/**
 * Image grayscale processing
 */
export function grayProcessing(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number) {
	x ??= 0
	y ??= 0
	w ??= this.canvas.width
	h ??= this.canvas.height
	const imageData = this.getImageData(x, y, w, h)
	for (let x = 0; x < imageData.width; x++) {
		for (let y = 0; y < imageData.height; y++) {
			const idx = (x + y * imageData.width) * 4
			const r = imageData.data[idx + 0]
			const g = imageData.data[idx + 1]
			const b = imageData.data[idx + 2]
			const gray = .299 * r + .587 * g + .114 * b
			imageData.data[idx + 0] = gray
			imageData.data[idx + 1] = gray
			imageData.data[idx + 2] = gray
			imageData.data[idx + 3] = 255
		}
	}
	this.putImageData(imageData, x, y)
}
/**
 * Draw a rounded Rect
 */
export function roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]) {
	this.beginPath()
	const minRadius = 0
	const maxRadius = Math.min(w, h) / 2
	let [topLeft, topRight, bottomRight, bottomLeft] = Convertor.fourValueSplit(radii)
	topLeft = topLeft.inRange(minRadius, maxRadius)
	topRight = topRight.inRange(minRadius, maxRadius)
	bottomRight = bottomRight.inRange(minRadius, maxRadius)
	bottomLeft = bottomLeft.inRange(minRadius, maxRadius)
	this.moveTo(x, y + topLeft)
	this.arcTo(x, y, x + topLeft, y, topLeft)
	this.arcTo(x + w, y, x + w, y + topRight, topRight)
	this.arcTo(x + w, y + h, x + w - bottomRight, y + h, bottomRight)
	this.arcTo(x, y + h, x, y + h - bottomLeft, bottomLeft)
	this.closePath()
	this.stroke()
	this.fill()
}


CanvasRenderingContext2D.prototype['drawCapsule'] = drawCapsule
CanvasRenderingContext2D.prototype['inverseColor'] = inverseColor
CanvasRenderingContext2D.prototype['grayProcessing'] = grayProcessing
CanvasRenderingContext2D.prototype['roundedRect'] = roundedRect
declare global {
	interface CanvasRenderingContext2D {
		/**
		 * Draw a capsule 
		 */
		drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void
		/**
		 * Invert image color
		 */
		inverseColor(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void
		/**
		 * Image grayscale processing
		 */
		grayProcessing(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void
		/**
		 * Draw a rounded Rect
		 */
		roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]): void
	}
}

