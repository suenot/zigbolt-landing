/**
 * ZigBolt landing sections — built on @marketmaker_cc/ui primitives
 * (Card, Badge, Button, Table) plus the adapted marketing components
 * (SectionHeader, FeatureCard) from the marketmaker.cc design system.
 *
 * Rendered as a static island (no client directive → zero JS shipped).
 * Content mirrors the previous splash page: performance figures are DESIGN
 * TARGETS, Raft is experimental, no production-usage claims.
 */
import {
	Zap,
	Layers,
	Gauge,
	Feather,
	LockOpen,
	Binary,
	Network,
	Vote,
	Archive,
	Languages,
	ShieldCheck,
	ArrowRight,
	ExternalLink,
} from 'lucide-react';
import { Badge } from '@marketmaker_cc/ui/badge';
import { Button } from '@marketmaker_cc/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@marketmaker_cc/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@marketmaker_cc/ui/table';
import { SectionHeader } from './SectionHeader';
import { FeatureCard } from './FeatureCard';

const ICON_CLASS = 'h-7 w-7';

const perfTargets = [
	{
		icon: <Zap className={ICON_CLASS} />,
		title: '< 200ns IPC Latency',
		description:
			'Shared memory channels with cache-line-padded atomics, designed for sub-200ns p50 round-trip latency (design target — run the bundled benchmarks on your hardware).',
	},
	{
		icon: <Layers className={ICON_CLASS} />,
		title: 'Zero Copy',
		description:
			'Messages decoded in-place via pointer cast. No serialization overhead on the hot path.',
	},
	{
		icon: <Gauge className={ICON_CLASS} />,
		title: '100M+ msg/sec',
		description:
			'Comptime wire codecs targeting 100M+ encode/decode operations per second.',
	},
	{
		icon: <Feather className={ICON_CLASS} />,
		title: 'No Runtime, No GC',
		description:
			'A single native shared library (about a megabyte). No JVM, no runtime, no garbage collector.',
	},
];

const features = [
	{
		icon: <LockOpen className={ICON_CLASS} />,
		title: 'Lock-Free Buffers',
		description:
			'SPSC (acquire/release atomics) and MPSC (CAS two-phase commit) ring buffers. 1-to-N broadcast buffer for market data fan-out.',
	},
	{
		icon: <Binary className={ICON_CLASS} />,
		title: 'SBE Codec',
		description:
			'FIX-standard Simple Binary Encoding with groups, vardata, and comptime schemas. NewOrderSingle, ExecutionReport, MarketData messages built-in.',
	},
	{
		icon: <Network className={ICON_CLASS} />,
		title: 'Aeron-Compatible Protocol',
		description:
			'Wire protocol flyweights (DataHeader, StatusMessage, NAK, Setup, RTT, Error). AIMD congestion control. Min/Max/Tagged flow control.',
	},
	{
		icon: <Vote className={ICON_CLASS} />,
		title: 'Raft Consensus',
		badge: 'Experimental',
		description:
			'Leader election, log replication, durable write-ahead log, persisted vote/term, atomic snapshots, and crash recovery. Liveness (election timers, transport) is the embedder’s responsibility; not yet validated with multi-process fault injection.',
	},
	{
		icon: <Archive className={ICON_CLASS} />,
		title: 'Archive & Replay',
		description:
			'Segment-based message recording with per-record CRC32 and configurable fsync. Catalog with time/stream queries. Sparse index. Standalone LZ4-style compression utility.',
	},
	{
		icon: <Languages className={ICON_CLASS} />,
		title: 'Five Language Bindings',
		description:
			'C, Rust, Python, Go, and TypeScript bindings — all five build and pass smoke tests against the C-ABI shared library.',
	},
];

const comparison = [
	{ feature: 'Language', zigbolt: 'Zig', aeron: 'Java/C++', chronicle: 'Java', zeromq: 'C' },
	{
		feature: 'IPC Latency (p50)',
		zigbolt: '< 200 ns (target)',
		aeron: '~200 ns',
		chronicle: '~1 us',
		zeromq: '~10 us',
	},
	{
		feature: 'SBE Codec',
		zigbolt: 'Native',
		aeron: 'XML codegen',
		chronicle: 'Chronicle Wire',
		zeromq: 'No',
	},
	{ feature: 'GC Pauses', zigbolt: 'None', aeron: 'JVM GC', chronicle: 'JVM GC', zeromq: 'None' },
	{
		feature: 'Reliability',
		zigbolt: 'NAK-based',
		aeron: 'NAK-based',
		chronicle: 'Replication',
		zeromq: 'REQ/REP',
	},
	{
		feature: 'Cluster',
		zigbolt: 'Raft (experimental)',
		aeron: 'Raft',
		chronicle: 'Enterprise',
		zeromq: 'None',
	},
	{
		feature: 'Binary Size',
		zigbolt: '~1 MB (no JVM)',
		aeron: '~20 MB',
		chronicle: '~50 MB',
		zeromq: '~1 MB',
	},
];

const relatedProjects = [
	{
		title: 'Marketmaker.cc',
		description: 'Market making tools and strategies for high-frequency trading.',
		href: 'https://marketmaker.cc',
		label: 'marketmaker.cc',
	},
	{
		title: 'StockAPIs.com',
		description: 'Real-time market data APIs.',
		href: 'https://stockapis.com',
		label: 'stockapis.com',
	},
];

function GitHubIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.54-.01 2.77-.01 3.15 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
		</svg>
	);
}

export default function LandingSections() {
	return (
		<div className="not-content font-sans text-foreground">
			{/* ---------------------------------------------------------- */}
			{/* Performance targets                                         */}
			{/* ---------------------------------------------------------- */}
			<section className="pt-16 pb-10" aria-labelledby="perf-targets">
				<SectionHeader
					badge="Performance Targets"
					title="Designed for the hot path"
					subtitle="Latency and throughput figures are design targets, not measured marketing numbers — the benchmark suite ships with the repo so you can verify on your own hardware."
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{perfTargets.map((card) => (
						<FeatureCard key={card.title} {...card} />
					))}
				</div>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Features                                                    */}
			{/* ---------------------------------------------------------- */}
			<section className="py-10" aria-labelledby="features">
				<SectionHeader
					badge="Features"
					title="Everything on the wire, nothing in the way"
					subtitle="A pure-Zig messaging core: lock-free data structures, zero-copy codecs, an Aeron-compatible protocol, and bindings for five languages."
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((card) => (
						<FeatureCard key={card.title} {...card} />
					))}
				</div>

				{/* Hardened & Tested — wide highlight card */}
				<Card className="mt-6 overflow-hidden">
					<div className="grid md:grid-cols-[auto,1fr] items-start gap-2 md:gap-6 p-2">
						<div className="p-6 pb-0 md:pb-6">
							<div className="p-3.5 inline-flex w-fit rounded-2xl bg-accent/5 shadow-inner text-accent-darker">
								<ShieldCheck className="h-8 w-8" />
							</div>
						</div>
						<div>
							<CardHeader className="p-6 pb-2 md:pl-0">
								<div className="flex flex-wrap items-center gap-3">
									<CardTitle className="text-xl my-0">Hardened & Tested</CardTitle>
									<Badge>423 tests</Badge>
									<Badge variant="outline">Debug + ReleaseFast</Badge>
								</div>
							</CardHeader>
							<CardContent className="p-6 pt-2 md:pl-0">
								<p className="text-muted-foreground leading-relaxed font-light my-0">
									The IPC shared-memory header is treated as untrusted (bounds-checked), ring
									buffers are memory-safe with back-pressure, and the FIX/SBE/flyweight wire
									parsers validate untrusted input — a malformed datagram cannot cause
									out-of-bounds access or panics.
								</p>
							</CardContent>
						</div>
					</div>
				</Card>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Comparison                                                  */}
			{/* ---------------------------------------------------------- */}
			<section className="py-10" aria-labelledby="comparison">
				<SectionHeader
					badge="Comparison"
					title="How ZigBolt stacks up"
					subtitle="ZigBolt latency figures are design targets; figures for other systems are their publicly stated numbers. Benchmark on your own hardware."
				/>
				<div className="glass rounded-3xl border border-border bg-card/40 overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="uppercase tracking-widest text-xs">Feature</TableHead>
								<TableHead className="uppercase tracking-widest text-xs text-accent-darker">
									ZigBolt
								</TableHead>
								<TableHead className="uppercase tracking-widest text-xs">Aeron</TableHead>
								<TableHead className="uppercase tracking-widest text-xs">
									Chronicle Queue
								</TableHead>
								<TableHead className="uppercase tracking-widest text-xs">ZeroMQ</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{comparison.map((row) => (
								<TableRow key={row.feature}>
									<TableCell className="font-medium text-foreground">{row.feature}</TableCell>
									<TableCell className="font-semibold text-accent-darker">
										{row.zigbolt}
									</TableCell>
									<TableCell className="text-muted-foreground">{row.aeron}</TableCell>
									<TableCell className="text-muted-foreground">{row.chronicle}</TableCell>
									<TableCell className="text-muted-foreground">{row.zeromq}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Related projects                                            */}
			{/* ---------------------------------------------------------- */}
			<section className="py-10" aria-labelledby="related">
				<SectionHeader
					badge="Family"
					title="Related Projects"
					subtitle="ZigBolt is developed alongside these projects by the same team."
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{relatedProjects.map((project) => (
						<a
							key={project.href}
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group block no-underline"
						>
							<Card className="h-full transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5">
								<CardHeader>
									<CardTitle className="flex items-center justify-between gap-3 my-0">
										{project.title}
										<ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent-darker transition-colors" />
									</CardTitle>
									<CardDescription className="my-0">{project.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<span className="text-sm font-bold uppercase tracking-widest text-accent-darker">
										{project.label}
									</span>
								</CardContent>
							</Card>
						</a>
					))}
				</div>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Closing CTA                                                 */}
			{/* ---------------------------------------------------------- */}
			<section className="py-16 text-center" aria-labelledby="cta">
				<div className="relative glass rounded-3xl border border-border bg-card/40 px-6 py-14 overflow-hidden">
					<div
						className="pointer-events-none absolute inset-0 opacity-60"
						style={{
							background:
								'radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb), 0.18) 0%, transparent 60%)',
						}}
					/>
					<h2
						id="cta"
						className="relative text-3xl md:text-5xl font-black tracking-tight mb-4 my-0 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
					>
						Measure it yourself.
					</h2>
					<p className="relative text-muted-foreground font-light text-lg max-w-xl mx-auto mb-10">
						Clone the repo, run the benchmark suite, and read the docs — zero runtime, zero GC,
						zero excuses.
					</p>
					<div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button asChild size="lg">
							<a href="/getting-started/introduction/">
								Get Started
								<ArrowRight className="h-5 w-5" />
							</a>
						</Button>
						<Button asChild variant="outline" size="lg">
							<a href="https://github.com/suenot/zigbolt" target="_blank" rel="noopener noreferrer">
								<GitHubIcon className="h-5 w-5" />
								GitHub
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
