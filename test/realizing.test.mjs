import test from "node:test";
import assert from "node:assert/strict";
import { frameToClause, realizeClause } from "../src/realizing.mjs";

test("revived English realization conjugates and keeps semantic roles explicit", () => {
  assert.deepEqual(realizeClause({ subject: "the Group", verb: "use", object: "one Actor model" }), { text: "the Group uses the one Actor model", tokens: ["the Group", "uses", "the one Actor model"] });
  assert.equal(realizeClause({ subject: "they", verb: "duplicate", negated: true }).text, "they do not duplicate");
  assert.deepEqual(frameToClause({ agent: "the Group", verb: "use", patient: "one model", instrument: "a schema" }), { subject: "the Group", verb: "use", object: "one model", obliques: [{ prep: "with", object: "a schema" }] });
});


test("finite-verb agreement follows the original English pronoun frame and known singular names", () => {
  for (const [subject, expected] of [
    ["I", "I write"], ["you", "you write"], ["he", "he writes"],
    ["she", "she writes"], ["we", "we write"], ["they", "they write"],
    ["James", "James writes"], ["the Group", "the Group writes"],
  ]) {
    assert.equal(realizeClause({subject,verb:"write"}).text, expected);
  }
});

test("future, negation and be do not lose tense or introduce invalid do-support", () => {
  const cases = [
    [{subject:"I",verb:"write",tense:"future"}, "I will write"],
    [{subject:"she",verb:"write",tense:"future",negated:true}, "she will not write"],
    [{subject:"they",verb:"write",tense:"future",negated:true}, "they will not write"],
    [{subject:"I",verb:"write",negated:true}, "I do not write"],
    [{subject:"you",verb:"write",negated:true}, "you do not write"],
    [{subject:"she",verb:"write",negated:true}, "she does not write"],
    [{subject:"they",verb:"write",tense:"past",negated:true}, "they did not write"],
    [{subject:"I",verb:"be"}, "I am"],
    [{subject:"you",verb:"be"}, "you are"],
    [{subject:"she",verb:"be"}, "she is"],
    [{subject:"we",verb:"be",tense:"past"}, "we were"],
    [{subject:"I",verb:"be",tense:"past"}, "I was"],
    [{subject:"they",verb:"be",tense:"future"}, "they will be"],
    [{subject:"I",verb:"be",negated:true}, "I am not"],
    [{subject:"you",verb:"be",negated:true}, "you are not"],
    [{subject:"she",verb:"be",tense:"past",negated:true}, "she was not"],
  ];
  for (const [spec, expected] of cases) {
    const realized = realizeClause(spec);
    assert.equal(realized.text,expected,JSON.stringify(spec));
    assert.equal(realized.tokens.join(" "),expected);
  }
});

test("realizer rejects unsupported tense and misleading truthy negation", () => {
  for (const spec of [
    {subject:"I",verb:"write",tense:"ongoing"},
    {subject:"I",verb:"write",negated:"false"},
    {subject:" ",verb:"write"},
    {subject:"I",verb:"  "},
  ]) assert.throws(()=>realizeClause(spec),TypeError);
});

test("existing oblique and frame ordering remains source-controlled",()=>{
  const spec=frameToClause({agent:"I",verb:"send",patient:"a letter",
    instrument:"the mail",recipient:"the group",location:"the office"},
    {tense:"future",negated:true});
  assert.deepEqual(spec,{subject:"I",verb:"send",object:"a letter",tense:"future",negated:true,
    obliques:[{prep:"with",object:"the mail"},{prep:"to",object:"the group"},{prep:"in",object:"the office"}]});
  const realized=realizeClause(spec);
  assert.equal(realized.text,"I will not send a letter with the mail to the group in the office");
});
