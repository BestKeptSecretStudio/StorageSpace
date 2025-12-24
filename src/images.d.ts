declare module "*.svg" {
	const Component: (props: SVGAttributes<SVGSVGElement>) => Element;
	export default Component;
}
