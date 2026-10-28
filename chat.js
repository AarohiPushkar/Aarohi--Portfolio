// Vercel serverless function: POST /api/chat
// The API key is read from an environment variable on Vercel and never reaches the browser or GitHub.
// Set GEMINI_API_KEY in Vercel > Project > Settings > Environment Variables.
// (Using a different provider from class? Replace the fetch() call below; the rest stays the same.)

const PORTFOLIO_INFO = `
You are the portfolio assistant for Aarohi Pushkar. Answer ONLY using the information below.
If the answer is not in it, say you don't have that information and suggest checking her GitHub.
Keep answers short, friendly and clear. Speak about Aarohi in the third person unless asked "who are you" (then say you are her portfolio assistant).

ABOUT
- Name: Aarohi Pushkar. Technical student at JECRC University (coursework in mathematics, C++ programming and project work).
- Skills: C/C++, Python, HTML, CSS (and basic JavaScript used in her web projects).
- Uses Cursor AI to help with coding and debugging, and makes sure she understands the code.
- GitHub: https://github.com/AarohiPushkar

PROJECTS (5)
1. Python Programs Collection: three beginner Python repositories, each with a README.
   - Factorial (repo Python_Basic_25BCON0213): command-line tool that computes the factorial of a number using a loop; rejects negative numbers. Example: input 5 gives 120.
   - Fibonacci (repo Fibonacci-25BCON0213): generates the Fibonacci sequence, where each number is formed from the preceding numbers; run with python fibonacci.py.
   - Structure-to-Dictionary (repo Struct-dict-25BCON0213): creates a student dictionary with name, roll number and marks, and prints it with an f-string (marks to one decimal place). Example output: Name: Rahul Roll: 101 Marks: 87.5.
2. Messy Python Code Improvement (repo Correcting-grade-25BCON0213, file messy_py.py): a messy Python script improved with AI help (clearer names, simpler logic, consistent formatting), with a comparison table.
3. Bug Fixing Using Cursor AI (repo Correcting-grade-25BCON0213): student grade utilities with three bugs, fixed with Cursor AI using a RED, FIX, GREEN workflow with unittest. The functions are calculate_average, is_passing (pass mark 40) and get_grade (Distinction, First, Second, Fail). The bugs were a denominator error in the average, a boundary comparison error, and a conditional evaluation order problem. Nine tests pass after the fixes.
4. Interactive Quiz Application (repo Quiz--25BCON0213, Lecture 10): HTML, CSS and JavaScript quiz. It shows one question at a time, checks the chosen answer, keeps a score and shows "Your score is X out of Y" at the end.
5. Book Reading List Application (Lecture 11): web app to add books and track a reading list; its README contains the deployed link.
All repositories are under https://github.com/AarohiPushkar/.

PORTFOLIO WEBSITE
- Sections: Home, About Me, Skills, Projects, Contact Information, AI Chatbot.
- Features: project search and filter (by name or technology), dark/light mode toggle, animated dark-themed interface, this chatbot.
- Built with HTML, CSS, JavaScript, deployed on Vercel, code on GitHub.
`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "The chatbot is not configured yet (missing API key on the server)." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const message = String(body.message || "").slice(0, 400).trim();
  if (!message) return res.status(400).json({ error: "Please type a question." });

  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
  const contents = history
    .filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string")
    .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, 800) }] }));
  contents.push({ role: "user", parts: [{ text: message }] });

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PORTFOLIO_INFO }] },
        contents,
        generationConfig: { temperature: 0.3, maxOutputTokens: 400 }
      })
    });

    if (!apiResponse.ok) {
      return res.status(502).json({ error: "The AI service responded with an error (" + apiResponse.status + ")." });
    }
    const data = await apiResponse.json();
    const reply = data && data.candidates && data.candidates[0] && data.candidates[0].content
      && data.candidates[0].content.parts && data.candidates[0].content.parts.map((p) => p.text || "").join("").trim();
    if (!reply) return res.status(502).json({ error: "The AI service returned an empty answer." });
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(502).json({ error: "Could not reach the AI service." });
  }
};

function safeParse(text) {
  try { return JSON.parse(text); } catch (e) { return {}; }
}
