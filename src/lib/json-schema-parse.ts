import traverse from "json-schema-traverse";
import type { AnswerType } from "./types";

export const parseJsonSchema = (schema: any) => {
    const rows: any[] = [];
    traverse(schema, (sub: any, ptr: any) => {
        if (!sub.type || sub.type === "object") return;
        const parts = ptr.split("/properties/").filter(Boolean);
        const property = parts.pop()!;
        const concern = parts.length ? parts[0] : "General";
        let answerType: AnswerType = "Text";
        if (sub.type === "integer") answerType = "Number";
        else if (Array.isArray(sub.enum)) {
            const e = sub.enum as string[];
            answerType =
                e.length === 2 && e.includes("Yes") && e.includes("No")
                    ? "Yes/No"
                    : "Dropdown";
        }
        rows.push({
            id: Date.now() + rows.length,
            concern,
            property,
            description: sub.description || "",
            answerType,
            options:
                Array.isArray(sub.enum) && answerType === "Dropdown"
                    ? sub.enum
                    : [],
            required: !sub.nullable,
            active: sub.active ?? true,
        });
    });
    return rows;
};
