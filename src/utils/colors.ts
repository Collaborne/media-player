import { multiply } from 'color-blend';

type RGB = [red: number, green: number, blue: number];
type RGBA = { r: number; g: number; b: number; a: number };
export function hexToRGB(h: string): RGB {
	let r;
	let g;
	let b;

	// 3 digits
	if (h.length === 4) {
		r = `0x${h[1]}${h[1]}`;
		g = `0x${h[2]}${h[2]}`;
		b = `0x${h[3]}${h[3]}`;
	}
	// 6 digits
	else if (h.length === 7) {
		r = `0x${h[1]}${h[2]}`;
		g = `0x${h[3]}${h[4]}`;
		b = `0x${h[5]}${h[6]}`;
	} else {
		throw new Error(`Unsupported color ${h}`);
	}

	return [+r, +g, +b];
}

function toHex(value: number) {
	return value.toString(16).padStart(2, '0');
}

function rgbaToHexA({ r, g, b, a }: RGBA) {
	const alpha = Math.round(a * 255);
	return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}

function rgbToRgba(rgb: RGB, alpha = 1): RGBA {
	const [r, g, b] = rgb;
	return { r, g, b, a: alpha };
}

/**
 * Factor with which each color is blended
 */
const BLEND_ALPHA = 0.3;
const INTENSIFIED_ALPHA = 0.6;

interface BlendConfig {
	/**
	 * Specifies an index in the colors array to be more prevalent than others
	 */
	intensifyIndex?: number;
	/**
	 * Specifies if all the colors should be intensify.
	 * If "intensifyAll" is "true", the value of "intensifyIndex" is ignored
	 */
	intensifyAll?: boolean;
	/**
	 * Specifies how much the blend factor should be watered down
	 */
	discountFactor?: number;
}

/**
 * Blends an array of hex color values together, with alpha composition
 *
 * @param colors An array of hex color values
 * @param config Specifies intensity configuration to use for blending
 * @visibleForTesting
 */
export function blend(
	colors: string[],
	{ intensifyIndex, intensifyAll, discountFactor = 1 }: BlendConfig = {},
): string | undefined {
	if (colors.length === 0) {
		return undefined;
	}

	const [initial, ...rest] = colors.map(hexToRGB).map((rgb, index) => {
		// Make the intensified color more prevalent that the other colors.
		const alpha =
			intensifyAll || intensifyIndex === index
				? INTENSIFIED_ALPHA
				: BLEND_ALPHA;
		return rgbToRgba(rgb, alpha * discountFactor);
	});

	const mixed = rest.reduce((background, foreground) => {
		return multiply(background, foreground);
	}, initial);

	return rgbaToHexA(mixed);
}
