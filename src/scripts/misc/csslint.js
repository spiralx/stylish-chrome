
/*
 // STYLISH: hack start
  var rules = CSSLint.getRules();
  var allowedRules = ["display-property-grouping", "duplicate-properties", "empty-rules", "errors", "known-properties"];
  CSSLint.clearRules();
  rules.forEach(function(rule) {
    if (allowedRules.indexOf(rule.id) >= 0) {
      CSSLint.addRule(rule);
    }
  });
  // STYLISH: hack end
*/


CSSLint.verify(text, {
  "display-property-grouping": 1,
  "duplicate-properties": 1,
  "empty-rules": 1,
  "errors": 2,
  "known-properties": 1
})
