import { useCallback, useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import { formatToCamelCase } from "@/lib/utils";
import { parseJsonSchema } from "@/lib/json-schema-parse";
import { type QuestionRow } from "@/lib/types";

import { CATEGORIES, SCHEMA_KEY } from "./lib/constants";

import "./App.css";

export default function App() {
    const [schema, setSchema] = useState<any>(() => {
        const s = localStorage.getItem(SCHEMA_KEY);
        return s ? JSON.parse(s) : {};
    });
    const [questions, setQuestions] = useState<QuestionRow[]>(() =>
        parseJsonSchema(schema)
    );
    const handleRowChange = useCallback(
        (id: number, field: keyof QuestionRow, value: any) => {
            setQuestions((qs) =>
                qs.map((q) => {
                    if (q.id !== id) return q;
                    const updated = { ...q, [field]: value };
                    if (field === "description") {
                        updated.property = formatToCamelCase(value);
                    }
                    if (field === "options" && typeof value === "string") {
                        updated.options = value.split(",").map((v) => v.trim());
                    }
                    return updated;
                })
            );
        },
        [formatToCamelCase]
    );
    const addQuestion = useCallback(() => {
        setQuestions((qs) => [
            ...qs,
            {
                id: Date.now(),
                category: "General History",
                property: "",
                description: "",
                answerType: "Text",
                options: [],
                required: false,
                active: true,
            },
        ]);
    }, []);
    const rebuild = useCallback(() => {
        const out: any = { type: "object", properties: {} };
        for (const q of questions) {
            const p: any = {
                type: q.answerType === "Number" ? "integer" : "string",
                description: q.description,
                nullable: !q.required,
                active: q.active,
            };
            if (q.answerType === "Yes/No") p.enum = ["Yes", "No"];
            if (q.answerType === "Dropdown") p.enum = q.options;
            if (q.category === "General History") {
                out.properties[q.property] = p;
            } else {
                out.properties[q.category] ??= {
                    type: "object",
                    properties: {},
                };
                out.properties[q.category].properties[q.property] = p;
            }
        }
        return out;
    }, [questions]);
    const generateJson = useCallback(() => {
        const newSchema = rebuild();
        setSchema(newSchema);
        localStorage.setItem(SCHEMA_KEY, JSON.stringify(newSchema, null, 2));
        console.log("Saved schema:", newSchema);
    }, [rebuild]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="w-[80vw] flex flex-col justify-start items-center">
                <h1 className="text-lg font-bold text-white mb-8">
                    Questions Json Schema
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer Type</TableHead>
                            <TableHead>Options</TableHead>
                            <TableHead>Required</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questions.map((q) => (
                            <TableRow key={q.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={q.active}
                                        onCheckedChange={(c) =>
                                            handleRowChange(q.id, "active", !!c)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={q.category}
                                        onValueChange={(v: string) =>
                                            handleRowChange(q.id, "category", v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map((c) => (
                                                <SelectItem key={c} value={c}>
                                                    {c}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Enter the question text"
                                        value={q.description}
                                        onChange={(e) =>
                                            handleRowChange(
                                                q.id,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={q.answerType}
                                        onValueChange={(v: string) =>
                                            handleRowChange(
                                                q.id,
                                                "answerType",
                                                v
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(
                                                [
                                                    "Text",
                                                    "Yes/No",
                                                    "Dropdown",
                                                    "Number",
                                                ] as const
                                            ).map((t) => (
                                                <SelectItem key={t} value={t}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {q.answerType === "Dropdown" ? (
                                        <Input
                                            placeholder="a, b, c"
                                            value={q.options.join(", ")}
                                            onChange={(e) =>
                                                handleRowChange(
                                                    q.id,
                                                    "options",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={q.required}
                                        onCheckedChange={(c) =>
                                            handleRowChange(
                                                q.id,
                                                "required",
                                                !!c
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex space-x-2 mt-4">
                    <Button onClick={addQuestion}>Add Question</Button>
                    <Button onClick={generateJson}>
                        Generate &amp; Save JSON
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
}
