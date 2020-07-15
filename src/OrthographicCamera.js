import Matrix4 from "./Matrix4";

class OrthographicCamera{
	constructor(position, target, up, left, right, bottom, top, near, far) {
		this.position = position;
		this.target = target;
		this.up = up;

		this.left = left;
		this.right = right;
		this.bottom = bottom;
		this.top = top;
		this.near = near;
		this.far = far;
		this.projection_matrix = new Matrix4();
		this.view_matrix = new Matrix4();

		this.update();
	}

	update(){
		this.view_matrix = new Matrix4().setView(this.position[0], this.position[1], this.position[2], this.target[0], this.target[1], this.target[2], this.up[0], this.up[1], this.up[2]);

		this.projection_matrix = new Matrix4().setOrthographic(this.left, this.right, this.bottom, this.top, this.near, this.far);
	}

	moveTo(position){
		this.position = position;
		this.update();
	}

	lookAt(target){
		this.target = target;
		this.update();
	}

	changeOrthographic(left, right, bottom, top, near, far){
		this.left = left;
		this.right = right;
		this.bottom = bottom;
		this.top = top;
		this.near = near;
		this.far = far;
		this.update();
	}
}

export default OrthographicCamera;