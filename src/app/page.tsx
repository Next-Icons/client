import Customization from "@/components/home/Customization";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Hero from "@/components/home/Hero";

export default function Home() {
	return (
		<div>
			<Hero />
			<Stats />
			<Features />
			<Customization />
		</div>
	);
}
