class Shader{
	constructor(vertex, fragment, attribute_names, uniform_names) {
		this.vertex = vertex;
		this.fragment = fragment;
		this.attribute_names = attribute_names;
		this.uniform_names = uniform_names;
	}

	initShader(webgl){
		const VertexShader = webgl.createShader(webgl.VERTEX_SHADER);
		const FragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);

		webgl.shaderSource(VertexShader, this.vertex);
		webgl.shaderSource(FragmentShader, this.fragment);

		webgl.compileShader(VertexShader);
		if (!webgl.getShaderParameter(VertexShader, webgl.COMPILE_STATUS)) {
			console.log(webgl.getShaderInfoLog(VertexShader));
		}

		webgl.compileShader(FragmentShader);
		if (!webgl.getShaderParameter(FragmentShader, webgl.COMPILE_STATUS)) {
			console.log(webgl.getShaderInfoLog(FragmentShader));
		}

		const Program = webgl.createProgram();
		webgl.attachShader(Program, VertexShader);
		webgl.attachShader(Program, FragmentShader);
		webgl.linkProgram(Program);

		this.program = Program;
	}

	initAttribute(webgl){
		this.attribute = {};
		for (let i in this.attribute_names){
			let attribute = this.attribute_names[i];
			let a_attribute = webgl.getAttribLocation(this.program, attribute);
			if (a_attribute < 0){
				console.log("Failed to get location for " + attribute);
				return null;
			}
			this.attribute[attribute] = a_attribute;
		}
	}

	initUniform(webgl){
		this.uniform = {};
		for (let i in this.uniform_names){
			let name = this.uniform_names[i];
			let u_uniform = webgl.getUniformLocation(this.program, name);
			if (u_uniform < 0){
				console.log("Failed to get location for " + name);
				return null;
			}
			this.uniform[name] = u_uniform;
		}
	}

	use(webgl){
		webgl.useProgram(this.program);
	}
}

export default Shader;