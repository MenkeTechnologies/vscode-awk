```
██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗       █████╗ ██╗    ██╗██╗  ██╗
██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝      ██╔══██╗██║    ██║██║ ██╔╝
██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  █████╗███████║██║ █╗ ██║█████╔╝ 
╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝  ╚════╝██╔══██║██║███╗██║██╔═██╗ 
 ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗      ██║  ██║╚███╔███╔╝██║  ██╗
  ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝      ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝
```

[![CI](https://img.shields.io/badge/CI-passing-39ff14.svg?labelColor=0d0221)](https://github.com/MenkeTechnologies/vscode-awk/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-online-05d9e8.svg?labelColor=0d0221)](https://menketechnologies.github.io/vscode-awk/)
[![Report](https://img.shields.io/badge/engineering-report-d300c5.svg?labelColor=0d0221)](https://menketechnologies.github.io/vscode-awk/report.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-ff2a6d.svg?labelColor=0d0221)](https://opensource.org/licenses/MIT)

### `[VS CODE EXTENSION // NEON GRAMMAR // FIELD RECORDS // LSP + DAP]`

> *"Open a `.awk`. Patterns, actions, fields, and regex light up — and `awkrs` jacks in."*

VS Code / VSCodium support for **AWK** — driven by **[awkrs](https://github.com/MenkeTechnologies)**, a pattern/action engine written in Rust (POSIX / gawk / mawk-style union CLI). A standalone TextMate grammar, filetype detection, language-server integration via `awkrs --lsp`, one-key running, and full debugging (breakpoints, stepping, variables) via `awkrs --dap`.

### [`Read the Docs`](https://menketechnologies.github.io/vscode-awk/) &middot; [`Engineering Report`](https://menketechnologies.github.io/vscode-awk/report.html) · [`vscode-stryke`](https://github.com/MenkeTechnologies/vscode-stryke) · [`zshrs`](https://github.com/MenkeTechnologies/zshrs)

---

## [0x00] OVERVIEW

**vscode-awk** is the VS Code / VSCodium extension for **AWK**, backed by the `awkrs` interpreter. It provides:

- **Filetype detection** — `*.awk` files and files whose first line is an AWK shebang (`#!/usr/bin/awk -f`, `#!/usr/bin/env awk`).
- **Syntax highlighting** — a standalone TextMate grammar (`source.awk`).
- **Language server** — `awkrs --lsp` via [vscode-languageclient](https://github.com/microsoft/vscode-languageserver-node) (diagnostics, hover, completion — whatever the server provides).
- **Run** — `AWK: Run File` (Ctrl+F5) executes the active script in a terminal as `awkrs -f <file>`.
- **Debugging** — breakpoints, stepping, call stack, variables, and watch via `awkrs --dap`.

The grammar covers the full AWK surface: the `BEGIN` / `END` special patterns, control-flow keywords, the built-in variables (`NR`, `NF`, `FS`, `OFS`, …), the built-in functions (`length`, `substr`, `split`, `gsub`, `sprintf`, `sqrt`, `system`, …), field references (`$0`, `$1`, `$NF`, `$(expr)`), `/.../` regex literals, the `~` / `!~` match operators, strings, numbers, and operators.

Created by **[MenkeTechnologies](https://github.com/MenkeTechnologies)**.

---

## [0x01] FEATURE MATRIX

| Capability | Status |
|---|---|
| Filetype detection — `*.awk` | **Implemented** — `contributes.languages` extension map |
| Filetype detection — shebang | **Implemented** — `firstLine` regex `^#!.*\bawk\b` |
| Syntax highlighting | **Implemented** — TextMate grammar (`source.awk`) |
| Comments / brackets / autoclose | **Implemented** — `language-configuration.json` |
| Indentation | **Implemented** — brace-based `indentationRules` |
| Language server | **Implemented** — `awkrs --lsp` via vscode-languageclient |
| Run | **Implemented** — `AWK: Run File` (Ctrl+F5 / editor-title ▶) runs `awkrs -f <file>` in a terminal |
| Debugging | **Implemented** — breakpoints, step over/into/out, call stack, scopes, variables, watch/hover, run-without-debugging, via `awkrs --dap` (native DAP) |
| Config | `awk.path`, `awk.lsp.enabled`, `awk.lsp.args` |

> The language server needs the `awkrs` binary. The extension resolves it from
> `$PATH` plus the common install locations (`/opt/homebrew/bin`, `/usr/local/bin`,
> `~/.cargo/bin`, `~/.local/bin`) — so it works even when the editor is launched
> from the macOS Dock / Finder, which doesn't inherit your shell `$PATH`. Install
> with `cargo install awkrs`. If it lives elsewhere, set `awk.path` to the
> absolute path.

---

## [0x02] INSTALL

This extension is not yet on the Marketplace. Build and install the `.vsix` locally:

```bash
git clone https://github.com/MenkeTechnologies/vscode-awk
cd vscode-awk
npm install
npx @vscode/vsce package          # produces vscode-awk-<version>.vsix
code --install-extension vscode-awk-*.vsix
```

Or drop the folder into your extensions dir for development:

```bash
git clone https://github.com/MenkeTechnologies/vscode-awk \
    ~/.vscode/extensions/vscode-awk
```

Open any `.awk` file — it lights up. The language server starts automatically when `awkrs` is on `$PATH`.

---

## [0x03] RUN & DEBUG

**Run** — open a `.awk` file and press **Ctrl+F5**, click the **▶** in the editor
title bar, or run **AWK: Run File** from the command palette. The file is saved
and executed as `awkrs -f <file>` in an integrated terminal.

**Debug** — set breakpoints in the gutter and press **F5** (or click the **debug**
icon in the editor title bar). No `launch.json` is required: F5 on a `.awk` file
debugs the active file. You get the full debugger — breakpoints, step
over/into/out, call stack, scopes, local + global variables, watch expressions,
and hover-to-evaluate — driven by the native debug adapter (`awkrs --dap`).

For a saved configuration, add to `.vscode/launch.json`:

```json
{
  "type": "awk",
  "request": "launch",
  "name": "AWK: Debug Current File",
  "program": "${file}",
  "cwd": "${workspaceFolder}",
  "stopOnEntry": false,
  "args": []
}
```

Launch attributes: `program`, `args`, `cwd`, `stopOnEntry`, `noDebug`,
`interpreterArgs`, and `awkPath` (override the binary for one session). The
adapter binary is resolved the same way as the language server, so it works under
the macOS GUI `$PATH`.

---

## [0x04] SYNTAX // SCOPES

The grammar maps AWK tokens to standard TextMate scopes, so every VS Code theme colors them:

| Token group | Scope | Sample |
|---|---|---|
| Special patterns | `keyword.other.special-pattern.awk` | `BEGIN` `END` |
| Control flow | `keyword.control.awk` | `if` `else` `while` `for` `do` `break` `continue` `next` `nextfile` `exit` `return` |
| Delete / membership | `keyword.control.delete.awk` / `keyword.operator.word.awk` | `delete` `in` |
| I/O statements | `keyword.other.io.awk` | `print` `printf` `getline` |
| Function intro | `storage.type.function.awk` | `function` `func` |
| Built-in variables | `variable.language.awk` | `NR` `NF` `FS` `OFS` `ORS` `RS` `FILENAME` `FNR` `RSTART` `RLENGTH` `SUBSEP` `ARGC` `ARGV` `ENVIRON` `CONVFMT` `OFMT` |
| String functions | `support.function.string.awk` | `length` `substr` `index` `split` `sub` `gsub` `match` `sprintf` `tolower` `toupper` |
| Math functions | `support.function.math.awk` | `sin` `cos` `atan2` `exp` `log` `sqrt` `int` `rand` `srand` |
| I/O functions | `support.function.io.awk` | `system` `close` `fflush` |
| Field references | `variable.language.field.awk` | `$0` `$1` `$NF` `$(NF-1)` |
| Match operators | `keyword.operator.match.awk` | `~` `!~` |

Strings (double-quoted with escapes), `/.../` regex literals, numbers (integer,
float, scientific, hex), comments (`#`), and the full operator set (assignment,
comparison, logical, arithmetic, ternary, pipe) are scoped too.

---

## [0x05] LANGUAGE SERVER

The extension launches `awkrs --lsp` (stdio JSON-RPC) through `vscode-languageclient`. Configure it in Settings:

| Setting | Default | Effect |
|---|---|---|
| `awk.path` | `awkrs` | Path to the awkrs executable |
| `awk.lsp.enabled` | `true` | Start the language server (set `false` for highlighting only) |
| `awk.lsp.args` | `["--lsp"]` | Args passed to start the server |

The transport is omitted so the client spawns bare `awkrs --lsp` and never
appends `--stdio` — the arg-rejection / "connection got disposed" failure mode
learned from vscode-stryke. If the binary is missing, the extension shows one
non-fatal warning and syntax highlighting keeps working.

---

## [0x06] VERIFYING THE GRAMMAR

Verify the grammar tokenizes correctly with the real VS Code grammar engine
(`vscode-textmate` + `vscode-oniguruma`, the engine VS Code itself uses):

```bash
npm install
node scripts/tokenize_test.js
```

---

## [0x07] LAYOUT

```
vscode-awk/
├── package.json                 # extension manifest (language, grammar, config, LSP, DAP)
├── language-configuration.json  # comments, brackets, autoclose, indent rules
├── extension.js                 # LSP client (awkrs --lsp) + run + debug (awkrs --dap)
├── lib/resolveBinary.js         # GUI-PATH-safe awkrs binary resolver
├── syntaxes/awk.tmLanguage.json # TextMate grammar (source.awk)
├── scripts/tokenize_test.js     # tokenizes a sample with vscode-textmate + asserts scopes
├── scripts/resolver_test.js     # unit tests for the binary resolver
└── scripts/activate_test.js     # LSP/DAP spawn-contract regression tests
```

---

## [0x08] LICENSE

MIT © **[MenkeTechnologies](https://github.com/MenkeTechnologies)**
