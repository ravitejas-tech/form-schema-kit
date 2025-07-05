# Questions JSON Schema Generator

A simple application to interactively build a JSON Schema from a set of custom-defined questions. Use it to power dynamic form builders, surveys, quizzes, medical case files, exam papers, and more.

## Features

* **Dynamic Question Table**: Add, edit, and remove questions on the fly.
* **Answer Types**: Support for Text, Number, Yes/No, and Dropdown (with custom options).
* **Categories & Nesting**: Organize questions into categories; nested schema structures for non-general categories.
* **Active/Required Flags**: Mark questions as active/inactive and required/optional.
* **Real-time JSON Schema Generation**: Click **Generate & Save JSON** to produce a valid JSON Schema object and persist it in `localStorage`.

## Use Cases

* **Form Builders**: Quickly scaffold JSON schemas for dynamic form rendering engines.
* **Question Papers & Quizzes**: Assemble exams or quizzes with structured metadata.
* **Medical Case Files**: Collect patient data fields and generate schema for validation.
* **Surveys & Feedback**: Design customer surveys or feedback forms with typed responses.
* **Any JSON-driven workflow**: Where question/answer metadata needs serialization and validation.

## Tech Stack

* **React** (functional components + hooks)
* **Vite** (fast dev + build)
* **TypeScript** (strict typing, interfaces)
* **Tailwind CSS** (utility-first styling)
* **LocalStorage** (schema persistence)

## Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/ravitejas-tech/questions-json-schema-generator.git
   cd questions-json-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Run in development mode**

   ```bash
   npm run dev
   # or yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Click **Add Question** to append a new row.
2. Fill out:

   * **Category**: Select from predefined categories (or extend them in `CATEGORIES`).
   * **Question**: Enter the question text; property keys auto-generate in camelCase.
   * **Answer Type**: Choose Text, Number, Yes/No, or Dropdown (enter comma-separated options).
   * **Required**: Toggle if the question must be answered.
   * **Active**: Toggle to include/exclude in final schema.
3. Click **Generate & Save JSON** to build the schema and store it in `localStorage`.
4. Check the console to view the saved schema:

   ```js
   Saved schema: { type: 'object', properties: { … } }
   ```

## File Structure

```
src/
├── App.tsx          # Main UI and state management
├── lib/
│   ├── constants.ts # CATEGORIES, SCHEMA_KEY
│   ├── utils.ts     # formatToCamelCase
│   ├── types.ts     # QuestionRow, AnswerType
│   └── json-schema-parse.ts # parseJsonSchema
└── components/      # UI primitives (Table, Input, Checkbox, Select, Button)
```

## Customization

* **Categories**: Update `CATEGORIES` in `lib/constants.ts` to add/remove groupings.
* **Styling**: Tailwind config available at `tailwind.config.js`.
* **Storage Key**: Change `SCHEMA_KEY` to avoid collisions in `localStorage`.
* **Schema Rules**: Modify `rebuild` logic in `App.tsx` to tweak JSON Schema output (e.g., add patterns, min/max).

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/awesome-question-type`
3. Commit your changes: \`git commit -m "feat: add new answer type"
4. Push to the branch: `git push origin feature/awesome-question-type`
5. Open a Pull Request detailing your enhancement.
