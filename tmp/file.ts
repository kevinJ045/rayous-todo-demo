import Page0 from "../app/page";

		const clientInit = { init: () => {}, after: () => {} };

		window.addEventListener('load', () => {
			const buildProps = (props) => (
				{ route: {path: "/", params: {} }, ...props}
			)

			const initResponse = typeof clientInit.init == "function" ? clientInit.init(buildProps) || {} : {};
	
			let page0 = new Page0();
let made0 = page0.build(buildProps({init: initResponse, page: null}));
	
			made0.to(document.body)
	
			if(typeof page0.afterBuild == "function") page0.afterBuild(buildProps({page: made0}));
			if(typeof clientInit.after == "function") clientInit.after(buildProps({page: made0}));
		});
	