export default {
	input: 'src/index.js',
	output: [
		{file: 'build/TinyRender.min.js', format: 'iife', sourcemap: true, name:"TinyRender"},
		{file: 'build/TinyRender.es.js', format: 'esm', sourcemap: true}
	],
};