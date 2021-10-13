const fragmentShader = `
	uniform sampler2D tex;  // Current Position Texture
	uniform sampler2D t_pos;  // Current Position Texture
	uniform sampler2D t_oPos; // Old Position Texture
	uniform vec2 resolution;  // Resolution of simulation

	uniform int numCalculationsPerItem;

	void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec4 color = texture2D(tex, uv).rgba;

		for(int i = 0; i < numCalculationsPerItem; i++) {
			color *= 2.0;
		}

		gl_FragColor = color;
	}
`

export default fragmentShader
