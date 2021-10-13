const fragmentShader = `
	void main() {
		vec2 uv = gl_FragCoord.xy / resolution.xy;
		vec4 colors = texture2D(inputTexture, uv).rgba;

		gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
	}
`

export default fragmentShader
