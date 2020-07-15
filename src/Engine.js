class Engine {
	constructor(dom) {
		this.dom = dom;
		this.models = [];
		this.camera = undefined;
		// TODO should init in index.html(before render)
		this.init();
	}

	init() {
		const canvas = document.getElementById(this.dom);

		const webgl = canvas.getContext("webgl", { antialias: true });
		if (!webgl) {
			console.log("Error to getContext for webgl");
		}

		webgl.clearColor(1.0, 1.0, 0.0, 1.0);
		webgl.enable(webgl.DEPTH_TEST);

		this.webgl = webgl;


		// TODO should init all models
	}

	addModel(model) {
		// TODO not init model here! should move it to init
		if (model.is_init === undefined) model.initModel(this.webgl);
		this.models.push(model);
	}

	setCamera(camera) {
		this.camera = camera;
	}

	render() {
		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);

		// TODO set webgl state here instead of in init
		// webgl.enable(webgl.DEPTH_TEST);


		// TODO split u_camera to u_modelMatrix,u_viewMatrix,u_projectionMatrix

		// TODO send u_viewMatrix,u_projectionMatrix once per render here

		for (let i in this.models) {
			let model = this.models[i];
			model.shader.use(this.webgl);

			if (model.shader.uniform["u_camera"]) {
				// TODO only send u_modelMatrix
				this.webgl.uniformMatrix4fv(model.shader.uniform["u_camera"], false, this.camera.matrix.elements);
			}

			this.webgl.drawArrays(this.webgl.TRIANGLES, 0, model.number);
		}
	}
}

export default Engine;