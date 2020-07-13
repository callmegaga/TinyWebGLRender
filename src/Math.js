/*
* 默认使用右手坐标系，但是webgl的裁剪坐标系是左手坐标系，所以对Z轴取反
* webgl使用列主序
* */
const DEFAULT_MATRIX_ELEMENTS = [
	1.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, -1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
];

class Vector4 {
	constructor(x, y, z, w) {
		this.elements = new Float32Array([x, y, z, w]);
	}

	// 加法
	add(){

	}

	// 减法
	minus(){

	}

	// 点乘
	dot(){

	}

	// 叉乘
	cross(){

	}

}

class Vector3 {
	constructor(x, y, z) {
		this.elements = new Float32Array([x, y, z]);
	}

	// 加法
	add(){

	}

	// 减法
	minus(){

	}

	// 点乘
	dot(){

	}

	// 叉乘
	cross(){

	}
}

class Matrix4 {
	constructor(elements) {
		elements = elements ? elements : DEFAULT_MATRIX_ELEMENTS;
		this.elements = new Float32Array(elements);
	}

	// 加法
	add(){

	}

	// 减法
	minus(){

	}

	// 点乘
	dot(){

	}

	// 旋转
	rotate(angle, x, y, z){
		const degree = angle / 180 * Math.PI;
		let cos = Math.cos(degree);
		let sin = Math.sin(degree);

		if (x === 0 && y === 0 && z !== 0){
			this.dot(new Matrix4([
				cos, sin, 0.0, 0.0,
				-sin, cos, 0.0, 0.0,
				0.0, 0.0, 1.0, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else if (x === 0 && y !== 0 && z === 0){
			this.dot(new Matrix4([
				cos, 0.0, -sin, 0.0,
				0.0, 1.0, 0.0, 0.0,
				sin, 0.0, cos, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else if (x !== 0 && y === 0 && z === 0){
			this.dot(new Matrix4([
				1.0, 0.0, 0.0, 0.0,
				0.0, cos, -sin, 0.0,
				0.0, -sin, cos, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else {

		}

	}
}
export {Vector4, Vector3, Matrix4};