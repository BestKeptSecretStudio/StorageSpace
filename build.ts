import { svgr } from "bun-plugin-svgr";

await Bun.build({
	entrypoints: ["./index.html"],
	outdir: "./dist",
	plugins: [svgr()],
});
