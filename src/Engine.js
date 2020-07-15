class Engine{
	constructor(dom) {
		this.dom = dom;
		this.models = [];
		this.camera = undefined;
		this.init();
	}

	init(){
		const canvas = document.getElementById(this.dom);

		const webgl = canvas.getContext("webgl", {antialias: true});
		if (!webgl) {
			console.log("Error to getContext for webgl");
		}

		webgl.clearColor(1.0, 1.0, 0.0, 1.0);
		webgl.enable(webgl.DEPTH_TEST);

		this.webgl = webgl;
	}

	addModel(model){
		if (model.is_init === undefined) model.initModel(this.webgl);
		this.models.push(model);
	}

	setCamera(camera){
		this.camera = camera;
	}

	render(){
		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);
		for (let i in this.models){
			let model = this.models[i];
			model.shader.use(this.webgl);

			if (model.shader.uniform["u_camera"]){
				this.webgl.uniformMatrix4fv(model.shader.uniform["u_camera"], false, this.camera.matrix.elements);
			}

			this.webgl.drawArrays(this.webgl.TRIANGLES, 0, model.number);
		}
	}
}

export default Engine;