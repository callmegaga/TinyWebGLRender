class Buffer{
	constructor(data, size, type, pointer_name) {
		this.data = data;
		this.size = size;
		this.type = type;
		this.pointer_name = pointer_name;
	}

	initBuffer(webgl, pointer){

		const buffer = webgl.createBuffer();
		webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
		webgl.bufferData(webgl.ARRAY_BUFFER, this.data, webgl.STATIC_DRAW);
		webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
		this.buffer = buffer;
		this.pointer = pointer;
	}

	initAttributeVariable(webgl){
		webgl.bindBuffer(webgl.ARRAY_BUFFER, this.buffer);
		webgl.vertexAttribPointer(this.pointer, this.size, this.type, false, 0, 0);
		webgl.enableVertexAttribArray(this.pointer);
	}
}

export default Buffer;