// Tokenize an AWK sample with the real VS Code grammar engine
// (vscode-textmate + vscode-oniguruma) and assert key scopes. Verifies the
// grammar actually loads under oniguruma and classifies tokens.
const fs = require('fs');
const path = require('path');
const vsctm = require('vscode-textmate');
const oniguruma = require('vscode-oniguruma');

const root = path.join(__dirname, '..');
const wasm = fs.readFileSync(path.join(root, 'node_modules/vscode-oniguruma/release/onig.wasm'));
const onigLib = oniguruma.loadWASM(wasm.buffer).then(() => ({
  createOnigScanner: (s) => new oniguruma.OnigScanner(s),
  createOnigString: (s) => new oniguruma.OnigString(s)
}));

const registry = new vsctm.Registry({
  onigLib,
  loadGrammar: () =>
    Promise.resolve(
      vsctm.parseRawGrammar(
        fs.readFileSync(path.join(root, 'syntaxes/awk.tmLanguage.json'), 'utf8'),
        'awk.tmLanguage.json'
      )
    )
});

const lines = [
  '#!/usr/bin/awk -f',
  'BEGIN { FS = ","; OFS = "\\t" }',
  '/^error/ { print $1, NF }',
  'function trim(s) {',
  '    gsub(/^ +| +$/, "", s)',
  '    return toupper(substr(s, 1, 3))',
  '}',
  '{ n = split($0, a, FS); printf "%d\\n", n }',
  'END { print NR }'
];

// (lineIndex, columnIndex) -> required scope substring
const checks = [
  [1, 0, 'keyword.other.special-pattern', 'BEGIN'],
  [1, 8, 'variable.language', 'FS'],
  [2, 0, 'string.regexp', '/^error/'],
  [2, 12, 'keyword.other.io', 'print'],
  [2, 18, 'variable.language.field', '$1'],
  [2, 22, 'variable.language', 'NF'],
  [3, 0, 'storage.type.function', 'function'],
  [3, 9, 'entity.name.function', 'trim'],
  [4, 4, 'support.function.string', 'gsub'],
  [5, 11, 'support.function.string', 'toupper'],
  [7, 6, 'support.function.string', 'split'],
  [8, 0, 'keyword.other.special-pattern', 'END'],
  [8, 12, 'variable.language', 'NR']
];

registry.loadGrammar('source.awk').then((grammar) => {
  let ruleStack = vsctm.INITIAL;
  const tokensPerLine = lines.map((line) => {
    const r = grammar.tokenizeLine(line, ruleStack);
    ruleStack = r.ruleStack;
    return r.tokens;
  });

  let failed = 0;
  for (const [li, col, wantScope, label] of checks) {
    const toks = tokensPerLine[li];
    const tok = toks.find((t) => col >= t.startIndex && col < t.endIndex);
    const scopes = tok ? tok.scopes.join(' ') : '(none)';
    const ok = scopes.includes(wantScope);
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  L${li}c${col} ${label.padEnd(10)} want=${wantScope.padEnd(30)} got=${scopes}`);
  }
  console.log(failed === 0 ? '\nALL TOKEN CHECKS PASSED' : `\n${failed} CHECK(S) FAILED`);
  process.exit(failed === 0 ? 0 : 1);
}).catch((e) => { console.error(e); process.exit(2); });
