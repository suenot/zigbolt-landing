/**
 * Adapted from ui-marketmaker-cc/components/marketing/section-header.tsx
 * (next/link-free; uses the local cn helper).
 */
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
	badge?: string;
	title: string;
	subtitle?: string;
	align?: 'left' | 'center';
	className?: string;
}

export function SectionHeader({
	badge,
	title,
	subtitle,
	align = 'center',
	className,
}: SectionHeaderProps) {
	return (
		<div className={cn('mb-14', align === 'center' && 'text-center', className)}>
			{badge && (
				<div
					className={cn(
						'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.05] border border-accent/[0.1] mb-6',
						align === 'center' && 'mx-auto'
					)}
				>
					<span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
					<span className="text-xs font-bold text-accent-darker uppercase tracking-[0.2em]">
						{badge}
					</span>
				</div>
			)}
			<h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.2] pb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
				{title}
			</h2>
			{subtitle && (
				<p
					className={cn(
						'mt-4 text-lg text-muted-foreground leading-relaxed font-light max-w-2xl',
						align === 'center' && 'mx-auto'
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
}
