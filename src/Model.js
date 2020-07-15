class Model{
	constructor(shader, buffers, number) {
		this.shader = shader;
		this.buffers = buffers;
		this.number = number;
	}

	initModel(webgl){
		this.shader.initShader(webgl);
		this.shader.initAttribute(webgl);
		this.shader.initUniform(webgl);
		this.initBuffers(webgl, this.shader.attribute);
		this.is_init = true;
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
}

export default Model;