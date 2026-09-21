# Communication & Workflow
- Communicates in casual Indonesian (e.g. "gw", "lo", "jelek", "bagus"); answers and summaries should be in Indonesian unless the artifact itself is English. Confidence: 0.9
- Works plan-first: asks for a thorough written implementation plan (with explicit plan documents) before coding, then says "implement the plan as specified" and expects the agent to work through the plan's to-dos without stopping. Confidence: 0.85
- Reviews work visually: sends screenshots and points at the exact offending spot ("masih ada di samping kanan", "pojok kiri bawah") rather than describing code, and expects the agent to act on that visual evidence. Confidence: 0.8
- Expects interaction and runtime behavior to be verified in addition to lint/build checks; does not accept a fix being called complete while the opened detail view is still visibly buggy. Confidence: 0.9
- Values concrete verification summaries with explicit checks and findings, especially for cross-locale work; expects the agent to fix issues discovered during validation and rerun the relevant checks. Confidence: 0.9
- Accepts nothing but "good" visually — iterates with short blunt verdicts ("masih jelek", "jadi sangat jelek") and expects a full creative redesign rather than incremental patches. Confidence: 0.85
- Expects the agent to derive and own the plan itself ("coba buat best plan", "silahkan pikirkan") rather than asking many clarifying questions. Confidence: 0.7
- Prefers strict scope control: when specifying one section to redesign, the agent should leave all other sections untouched until explicitly requested. Confidence: 0.95
- Prefers temporary feature replacement to be non-destructive: hide or comment out the old UI and preserve its component/code for possible restoration instead of deleting it. Confidence: 0.98
