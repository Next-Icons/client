import Customization from "@/components/home/Customization"
import Partners from "@/components/home/Partners"
import Features from "@/components/home/Features"
import Stats from "@/components/home/Stats"
import Hero from "@/components/home/Hero"
import FAQ from "@/components/home/FAQ"

export default function Home() {
	return (
		<div>
			<Hero />
			<Stats />
			<Features />
			<Customization />
			<Partners />
			<FAQ />
		</div>
	)
}
