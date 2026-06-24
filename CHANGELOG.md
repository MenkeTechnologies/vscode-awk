# Changelog

## 0.1.0

- Initial release.
- Filetype detection for `*.awk` and AWK shebangs (`#!/usr/bin/awk`, `#!/usr/bin/env awk`).
- TextMate grammar (`source.awk`) — special patterns (`BEGIN` / `END`), control
  keywords (`if` / `else` / `while` / `for` / `do` / `break` / `continue` /
  `next` / `nextfile` / `exit` / `return` / `delete` / `in` / `getline`),
  built-in variables (`NR` `NF` `FS` `OFS` `ORS` `RS` `FILENAME` `FNR` `RSTART`
  `RLENGTH` `SUBSEP` `ARGC` `ARGV` `ENVIRON` `CONVFMT` `OFMT` …), built-in
  functions (`length` `substr` `index` `split` `sub` `gsub` `match` `sprintf`
  `sin` `cos` `atan2` `exp` `log` `sqrt` `int` `rand` `srand` `tolower`
  `toupper` `system` `close` `fflush`), field references (`$0` `$1` `$NF`
  `$(expr)`), `/.../` regex literals, `~` / `!~` match operators, strings,
  numbers, comments, and operators.
- Editor configuration: line comment `#`, brackets, auto-closing / surrounding
  pairs, word pattern, and brace-based indentation.
- Language server integration via `awkrs --lsp` (vscode-languageclient). The
  transport is omitted so the client spawns bare `awkrs --lsp` and never appends
  `--stdio` (the arg-rejection / "connection got disposed" failure mode learned
  from vscode-stryke).
- Running: `AWK: Run File` command (Ctrl+F5, editor-title ▶, command palette)
  saves and runs the active `.awk` file as `awkrs -f <file>` in a terminal.
- Debugging via `awkrs --dap`: gutter breakpoints, step over/into/out, call
  stack, scopes, variables, watch / hover-to-evaluate, and run-without-debugging.
  F5 on a `.awk` file works with no `launch.json`; launch attributes
  `program` / `args` / `cwd` / `stopOnEntry` / `noDebug` / `interpreterArgs` /
  `awkPath` are supported. The adapter binary is resolved like the language
  server, so it works under the macOS GUI `$PATH`.
