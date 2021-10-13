const fragmentShader = `
	uniform sampler2D tex;  // Current Position Texture
	uniform sampler2D t_pos;  // Current Position Texture
	uniform sampler2D t_oPos; // Old Position Texture
	uniform vec2 resolution;  // Resolution of simulation

	void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec4 color = texture2D(tex, uv).rgba;
		gl_FragColor = color * 2.0;
	}
`

export default fragmentShader
