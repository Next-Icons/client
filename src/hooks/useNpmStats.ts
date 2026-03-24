"use client"

import * as React from "react"

interface NpmStats {
	loading: boolean
	downloads: number
	error: Error | null
	formattedDownloads: string
}

export function useNpmStats(packageName: string): NpmStats {
	const [formattedDownloads, setFormattedDownloads] = React.useState<string>("0")
	const [error, setError] = React.useState<Error | null>(null)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [downloads, setDownloads] = React.useState<number>(0)

	React.useEffect(() => {
		const fetchStats = async () => {
			try {
				const today = new Date().toISOString().split("T")[0]

				const res = await fetch(`https://api.npmjs.org/downloads/point/2023-01-01:${today}/${packageName}`)
				if (!res?.ok) throw new Error("Failed to fetch download statistics from npm registry")

				const data = await res?.json()
				const downloadCount = data?.downloads || 0

				setDownloads(downloadCount)
				setFormattedDownloads(formatNumber(downloadCount))
			} catch (err) {
				console.info("Failed to fetch download statistics from npm registry")
				console.error(err)

				setError(err instanceof Error ? err : new Error("Unknown Error"))
				setFormattedDownloads("0")
			} finally {
				setLoading(false)
			}
		}

		if (packageName) fetchStats()
	}, [packageName])

	return { downloads, formattedDownloads, loading, error }
}

function formatNumber(count: number): string {
	if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k"
	return count?.toString()
}
