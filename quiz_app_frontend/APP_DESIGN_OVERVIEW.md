# Staffan Johnsson's 80th Birthday Quiz – Visual/Design Walkthrough

## Overall Look & Feel
- **Style:** Modern, festive, and clean UI with bold, sans-serif typography and strong central layout. 
- **Palette:**  
  - **Primary:** #1227ca (deep blue) – used for buttons, main text, and headings.
  - **Accent:** #ffdd00 (bright gold/yellow) – used for highlights, confetti, and CTAs.
  - **Secondary:** #f9f7f1 (soft beige) – background of the whole app.
  - **Emerald/Green:** #30c97e for correct answers, **Red:** #f44336 for incorrect.
- **Responsive:** All screens adapt to mobile (≤568px wide) and desktop, with at least 2-rem padding and centered content.
- **Accessibility:** Keyboard/tab navigation, all images have `alt`/`aria-label`, button states and focus styling, text color contrast, large touch targets.

---

## Layout & Components

### 1. **Flag Banner**
- A prominent dual-flag row (U.S.A left, Sweden right) both at the **top** and the **bottom** of every screen.
- Flags sized for clarity and festive effect, with a yellow/gold (`#ffdd00`) or blue gradient background stripe beneath.
- Symbolizes Staffan’s life across two countries.

### 2. **Welcome Screen**
- **Content is centered**: Large blue (`#1227ca`) title — “Staffan Johnsson's 80th Birthday Quiz”.
- **Staffan photo:** Rounded, gradient-backed placeholder avatar (`👴`) in center, with “Turning 80 with style!” as a small italic caption.
- **Input form:** Single field for user's first name, clearly labeled, with input validation.
  - **Validation:** Min. 2 characters, error text in soft red if invalid.
  - **Start Quiz** button: Large, gold accent background. Only enabled on valid input.
- **Option to view leaderboard** (small, linked text) below.
- **Flags** at top and bottom frames.

### 3. **Quiz Screen**
- **Header:** Staffan’s name addressed (“Good luck, [user name]!”) and current question progress (e.g. “Question 3/7”).
- **Question area:** White, slightly raised card, subtle drop-shadow, bold centered text.
- **Answer buttons:** Rectangular, blue-outlined default.
  - Show green (correct) or red (incorrect) fill after selection. 
  - Next button only enabled after selection.
- **Score preview:** Current cumulative score is shown below answers for encouragement.

### 4. **Results Screen**
- **Celebratory top:** Emoji cluster with confetti, balloons, and both flags.
- **"Congratulations [Name]!"** headline, in blue and large bold type.
- **Final score:** Large, gold-accented number (“You scored 5/7”).
- **Message:** Friendly line (“Well done on taking the quiz celebrating Staffan’s 80th!”).
- **Actions:** Two big buttons for *Play Again* (accent color) and *View Leaderboard* (primary color).
- **Animated Confetti:** A celebratory animation drifts confetti across the top of the result screen.

### 5. **Leaderboard Screen**
- **Title:** “Leaderboard” with trophy emoji.
- **Results table:** White card, prominent, table of names/scores (high to low), filled for current session.
  - “Be the first to play!” message as placeholder if empty.
- **Button:** “Play a New Game” in accent color.
- **Flags:** Always top and bottom.

---

## Celebratory Features
- **Confetti Animation:** On results screen only — animated festivity, disappears after a few seconds.
- **Flag Imagery:** SVG flag images with alt text and clear meaning (never hidden).
- **Emoji:** Used for emotional feel and festive navigation cues.

## Color & Visual Accessibility
- All text passes WCAG AA against backgrounds.
- Buttons have focus outlines and disabled visual cues.
- Contrasting background for answer choices and white quiz/result/leaderboard cards stand out on beige secondary background.

## Mobile Responsiveness
- Cards, layouts, and font sizes scale for touch/phone experience.
- Buttons and inputs never smaller than Apple/Google recommended minimums.

## Alt/ARIA
- Alt text on all images and flag icons.
- Role and aria-labels on main photo and celebratory clusters.
- ARIA live regions for score updates and input validation.

---

## User Flow

1. **Launches to Welcome:** Sees colorful site, Staffan icon, name input.
2. **Inputs name → Start Quiz:** If valid, begins quiz (shuffled short round).
3. **Answers multiple choice**: Next only available after an answer, current score shown.
4. **On finish:** Confetti, congratulation message personalized, both flags, “Play Again” or “Leaderboard”.
5. **Leaderboard:** Persisted in localStorage, sorted by score, Play New Game button.

---

### This app celebrates Staffan Johnsson — playful, modern, inviting, and inclusive.

