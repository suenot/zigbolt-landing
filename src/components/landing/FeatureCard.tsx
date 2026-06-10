/**
 * Adapted from ui-marketmaker-cc/components/marketing/feature-card.tsx
 * (adds an optional Badge slot for honest labelling, e.g. "Experimental").
 */
import type { ReactNode } from 'react';
import { Badge } from '@marketmaker_cc/ui/badge';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	badge?: string;
	className?: string;
}

export function FeatureCard({ icon, title, description, badge, className }: FeatureCardProps) {
	return (
		<div className={cn('group relative h-full', className)}>
			<div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
			<div className="relative h-full glass p-7 rounded-3xl border border-border bg-card/40 backdrop-blur-xl flex flex-col transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5">
				<div className="mb-6 p-3.5 inline-flex w-fit rounded-2xl bg-accent/5 transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110 group-hover:rotate-3 shadow-inner text-accent-darker">
					{icon}
				</div>
				<div className="flex items-start justify-between gap-3 mb-3">
					<h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-accent-darker transition-colors duration-500 my-0">
						{title}
					</h3>
					{badge && <Badge variant="outline" className="shrink-0 mt-1">{badge}</Badge>}
				</div>
				<p className="text-muted-foreground leading-relaxed font-light text-base flex-grow my-0">
					{description}
				</p>
				<div className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-accent/20 rounded-br-2xl group-hover:border-accent/40 transition-colors" />
			</div>
		</div>
	);
}
