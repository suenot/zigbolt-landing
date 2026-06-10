---
title: Quick Start
description: Get up and running with ZigBolt in 5 minutes
---

## Prerequisites

- [Zig 0.15.1](https://ziglang.org/download/) or later

## Build

```bash
git clone https://github.com/suenot/zigbolt.git
cd zigbolt
zig build
```

## Run Tests

```bash
zig build test
```

All 423 tests should pass — in both Debug and ReleaseFast
(`zig build test -Doptimize=ReleaseFast`).

## Run Benchmarks

```bash
zig build bench
./zig-out/bin/bench_run_all
```

## Hello World: IPC Publisher / Subscriber

### Publisher

```zig
const zigbolt = @import("zigbolt");

pub fn main() !void {
    var channel = try zigbolt.IpcChannel.create("/market-feed", .{
        .term_length = 1 << 20,  // 1 MB term buffers
        .pre_fault = true,
    });
    defer channel.deinit();

    var publisher = zigbolt.Publisher(zigbolt.TickMessage).init(&channel, 1);

    const tick = zigbolt.TickMessage{
        .timestamp_ns = zigbolt.timestampNs(),
        .symbol_id = 42,
        .price = 15025_00,
        .volume = 100,
        .side = .bid,
    };

    try publisher.offer(&tick);
}
```

### Subscriber

```zig
const std = @import("std");
const zigbolt = @import("zigbolt");

var tick_count: u64 = 0;

fn handleTick(msg: *align(1) const zigbolt.TickMessage) void {
    tick_count += 1;
    if (tick_count % 100_000 == 0) {
        const latency = zigbolt.timestampNs() - msg.timestamp_ns;
        std.debug.print("Tick #{d}: latency={d}ns\n", .{ tick_count, latency });
    }
}

pub fn main() !void {
    var channel = try zigbolt.IpcChannel.open("/market-feed", .{
        .term_length = 1 << 20,
    });
    defer channel.deinit();

    var subscriber = zigbolt.Subscriber(zigbolt.TickMessage).init(&channel, 1);

    while (true) {
        const count = subscriber.poll(&handleTick, 256);
        if (count == 0) std.atomic.spinLoopHint();
    }
}
```

## Using ZigBolt from Other Languages

`zig build` also produces the C-ABI shared library
(`zig-out/lib/libzigbolt.dylib` on macOS, `.so` on Linux). Five language
bindings — C, Rust, Python, Go, and TypeScript — live in the repository's
`bindings/` directory; all five build and pass smoke tests against the
library. Most bindings locate the library via the shared `ZIGBOLT_LIB_PATH`
environment variable (a file path or the containing directory):

```bash
export ZIGBOLT_LIB_PATH=/path/to/zigbolt/zig-out/lib
```

See [Installation](/getting-started/installation/) for per-language setup.

## Next Steps

- Read the full [API Reference](/reference/api-reference/) for all modules
- Check out more [Usage Examples](/examples/usage/)
- Review the [Architecture](/architecture/overview/) for design details
- Run [Benchmarks](/performance/benchmarks/) on your hardware
