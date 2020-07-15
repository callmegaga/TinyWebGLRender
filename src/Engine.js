class Engine {
	constructor(dom) {
		this.dom = dom;
		this.models = [];
		this.camera = undefined;
	}

	init() {
		const canvas = document.getElementById(this.dom);

		const webgl = canvas.getContext("webgl", { antialias: true });
		if (!webgl) {
			console.log("Error to getContext for webgl");
		}
		webgl.clearColor(1.0, 1.0, 0.0, 1.0);
		this.webgl = webgl;
		this.initModels();
	}

	initModels(){
		for (let i in this.models){
			let model = this.models[i];
			model.initModel(this.webgl);
		}
	}

	addModel(model) {
		this.models.push(model);
	}

	setCamera(camera) {
		this.camera = camera;
	}

	render() {
		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);

		this.webgl.enable(this.webgl.DEPTH_TEST);

		for (let i in this.models){
			let model = this.models[i];
			this.webgl.uniformMatrix4fv(model.shader.uniform["u_projection"], false, this.camera.projection_matrix.elements);
			this.webgl.uniformMatrix4fv(model.shader.uniform["u_view"], false, this.camera.view_matrix.elements);
		}

		for (let i in this.models) {
			let model = this.models[i];

			model.shader.use(this.webgl);

			model.initBuffersVariables(this.webgl);

			this.webgl.uniformMatrix4fv(model.shader.uniform["u_model"], false, model.matrix.elements);

			this.webgl.drawArrays(this.webgl.TRIANGLES, 0, model.number);
		}
	}
}

export default Engine;