"use client";

import IntroductionExport from "@/components/guidepage/IntroductionExport";

export default function Guide() {
	return (
		<div className="mx-auto flex w-full flex-col justify-center px-4 pb-10 pt-28 lg:min-h-screen lg:pb-0 lg:pt-28 xl:px-0">
			<div>
				<IntroductionExport />
			</div>
		</div>
	);
}
