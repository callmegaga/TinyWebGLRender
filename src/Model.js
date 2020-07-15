import Buffer from "./Buffer";
import Matrix4 from "./Matrix4";
class Model{
	constructor(shader, vertices, colors) {
		this.shader = shader;
		this.vertices = vertices;
		this.colors = colors;
		this.matrix = new Matrix4();

		// 计算需要绘制的三角形个数
		this.number = Math.floor(vertices.length / 3);
	}

	initModel(webgl){
		this.shader.initShader(webgl);
		this.shader.initAttribute(webgl);
		this.shader.initUniform(webgl);

		const vertex_buffer = new Buffer(this.vertices, 3, webgl.FLOAT, "a_position");
		const color_buffer = new Buffer(this.colors, 3, webgl.FLOAT, "a_color");

		this.buffers = [vertex_buffer, color_buffer];

		this.initBuffers(webgl, this.shader.attribute);
	}

	initBuffers(webgl, pointers){
		for (let i in this.buffers){
			let buffer = this.buffers[i];
			let pointer = pointers[buffer.pointer_name];
			if (pointer === undefined){
				console.log("Can't find attribute " + buffer.pointer_name);
			}
			buffer.initBuffer(webgl, pointer);
		}
	}

	// 将shader中的attribute与buffer绑定
	initBuffersVariables(webgl) {
		for (let i in this.buffers){
			let buffer = this.buffers[i];
			buffer.initAttributeVariable(webgl);
		}
	}

	moveTo(x, y, z){
		this.matrix.setTranslate(x, y, z);
	}
}

export default Model;