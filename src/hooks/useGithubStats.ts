"use client"

import * as React from "react"

interface GithubStats {
	stars: number
	loading: boolean
	error: Error | null
	formattedStars: string
}

export function useGithubStats(repo: string): GithubStats {
	const [formattedStars, setFormattedStars] = React.useState<string>("0")
	const [error, setError] = React.useState<Error | null>(null)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [stars, setStars] = React.useState<number>(0)

	React.useEffect(() => {
		const fetchStats = async () => {
			try {
				const res = await fetch(`https://api.github.com/repos/${repo}`)
				if (!res?.ok) throw new Error("Failed to fetch GitHub repository statistics")

				const data = await res?.json()
				const starCount = data?.stargazers_count

				setStars(starCount)
				setFormattedStars(formatStars(starCount))
			} catch (err) {
				console.info("Failed to fetch GitHub repository statistics")
				console.error(err)

				setError(err instanceof Error ? err : new Error("Unknown Error"))
			} finally {
				setLoading(false)
			}
		}

		if (repo) fetchStats()
	}, [repo])

	return { stars, formattedStars, loading, error }
}

function formatStars(count: number): string {
	if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k"
	return count?.toString()
}
