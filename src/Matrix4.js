const DEFAULT_MATRIX_ELEMENTS = [
	1.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
];

class Matrix4 {
	constructor(elements) {
		elements = elements ? elements : DEFAULT_MATRIX_ELEMENTS;
		this.elements = new Float32Array(elements);
	}

	// 设置矩阵的各元素
	set(elements){
		this.elements = elements;
		return this;
	}

	// 加法
	add(){

	}

	// 减法
	minus(){

	}

	// 矩阵右乘
	multiply(matrix){
		// 计算result = a * b;
		let result = new Float32Array(16);
		let a = this.elements;
		let b = matrix.elements;

		let ai0, ai1, ai2, ai3;

		for (let i = 0; i < 4 ; i++){
			// 列主序，取得a矩阵的每行
			ai0 = a[i];
			ai1 = a[i + 4];
			ai2 = a[i + 8];
			ai3 = a[i + 12];

			result[i]      = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
			result[i + 4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
			result[i + 8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
			result[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
		}


		this.elements = result;
		return this;
	}

	// 旋转
	rotate(angle, x, y, z){
		const degree = angle / 180 * Math.PI;
		let cos = Math.cos(degree);
		let sin = Math.sin(degree);

		if (x === 0 && y === 0 && z !== 0){
			// 绕Z轴旋转
			if (z < 0){
				sin = -sin;
			}

			this.multiply(new Matrix4([
				cos, sin, 0.0, 0.0,
				-sin, cos, 0.0, 0.0,
				0.0, 0.0, 1.0, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else if (x === 0 && y !== 0 && z === 0){
			// 绕Y轴旋转
			if (y < 0){
				sin = -sin;
			}
			this.multiply(new Matrix4([
				cos, 0.0, -sin, 0.0,
				0.0, 1.0, 0.0, 0.0,
				sin, 0.0, cos, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else if (x !== 0 && y === 0 && z === 0){
			// 绕X轴旋转
			if (x < 0){
				sin = -sin;
			}
			this.multiply(new Matrix4([
				1.0, 0.0, 0.0, 0.0,
				0.0, cos, -sin, 0.0,
				0.0, -sin, cos, 0.0,
				0.0, 0.0, 0.0, 1.0
			]));
		}else {
			// 绕任意轴旋转，公式推导地址：http://www.cppblog.com/lovedday/archive/2008/01/12/41031.html
			let len = Math.sqrt(x * x + y * y + z * z);
			let rlen;
			if (len !== 1){
				rlen = 1 / len;
				x *= rlen;
				y *= rlen;
				z *= rlen;
			}

			let nc = 1 - cos;
			let xy = x * y;
			let yz = y * z;
			let zx = z * x;
			let xs = x * sin;
			let ys = y * sin;
			let zs = z * sin;

			this.multiply(new Matrix4([
				x * x * nc + cos, xy * nc + zs,     zx * nc - ys,      0,
				xy * nc -zs,      y * y * nc + cos, yz * nc + xs,      0,
				zx * nc + ys,     yz * nc - xs,     z * z * nc + cos,  0,
				0,                0,                0,                 1
			]));
		}
		return this;
	}

	// 设置为仅进行旋转的矩阵
	setRotate(angle, x, y, z){
		this.set(DEFAULT_MATRIX_ELEMENTS).rotate(angle, x, y, z);
		return this;
	}

	// 设置为仅进行平移的矩阵
	setTranslate(x, y, z){
		this.set(new Float32Array([
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			x,   y,   z,   1.0
		]));
		return this;
	}

	// 进行平移
	translate(x, y, z){
		this.multiply(new Matrix4().setTranslate(x, y, z));
		return this;
	}

	// 设置View矩阵
	setView(positionX, positionY, positionZ, pointX, pointY, pointZ, upX, upY, upZ){
		/*
		* 公式推导过程：https://blog.csdn.net/weixin_37683659/article/details/79830278
		*
		* */
		let direction = [];
		let second_vector = [];
		let third_vector = [];

		// 计算视线的向量
		direction[0] = pointX - positionX;
		direction[1] = pointY - positionY;
		direction[2] = pointZ - positionZ;

		// 规范化方向向量，基向量必须是单位向量
		let length = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]);
		direction[0] = direction[0] / length;
		direction[1] = direction[1] / length;
		direction[2] = direction[2] / length;

		// 利用方向向量和上方向向量，叉乘，获得第二个基向量
		second_vector[0] = direction[1] * upZ - direction[2] * upY;
		second_vector[1] = direction[2] * upX - direction[0] * upZ;
		second_vector[2] = direction[0] * upY - direction[1] * upX;

		length = Math.sqrt(second_vector[0] * second_vector[0] + second_vector[1] * second_vector[1] + second_vector[2] * second_vector[2]);
		second_vector[0] = second_vector[0] / length;
		second_vector[1] = second_vector[1] / length;
		second_vector[2] = second_vector[2] / length;

		// 利用第二个基向量和视线方向向量叉乘，获得第三个基向量, 相互垂直的单位向量叉乘，结果依旧是单位向量，所以不需要再进行规范化
		third_vector[0] = second_vector[1] * direction[2] - second_vector[2] * direction[1];
		third_vector[1] = second_vector[2] * direction[0] - second_vector[0] * direction[2];
		third_vector[2] = second_vector[0] * direction[1] - second_vector[1] * direction[0];

		// 因为webgl的裁剪坐标系是左手坐标系，需要在视图矩阵中对Z轴坐标进行取反
		this.set(new Float32Array([
			second_vector[0], third_vector[0], -direction[0], 0.0,
			second_vector[1], third_vector[1], -direction[1], 0.0,
			second_vector[2], third_vector[2], -direction[2], 0.0,
			0.0,			  0.0,			   0.0,			  1.0
		]));

		this.translate(-positionX, -positionY, -positionZ);
		return this;

	}

	// 设置正射投影矩阵
	setOrthographic(left, right, bottom, top, near, far){

		// 公司推导：https://blog.csdn.net/gggg_ggg/article/details/45969499
		const width = right - left;
		const height = top - bottom;
		const depth = far - near;

		this.set(new Float32Array([
			2 / width,               0.0,                      0.0,                   0.0,
			0.0,                     2 / height,               0.0,                   0.0,
			0.0,                     0.0,                      2 / depth,            0.0,
			-(left + right) / width, -(top + bottom) / height, -(near + far) / depth, 1.0
		]));
		return this;
	}

	// 设置透视投影矩阵
	setPerspective(){

	}
}

export default Matrix4;