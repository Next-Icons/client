"use client";

import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-[family-name:var(--font-clashdisplay-medium)] transition-colors focus:outline-none focus:ring-0",
	{
		variants: {
			variant: {
				default:
					"dark:border-zinc-600 dark:bg-zinc-800 dark:text-white text-black bg-zinc-200 border-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
