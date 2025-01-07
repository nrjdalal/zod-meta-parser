import { zodMetaParser } from "@/index"
import { z } from "zod"

console.log(
  zodMetaParser(
    z.object({
      id: z.number(), // no description
      email: z.string().describe(JSON.stringify({ unique: true })),
      image: z
        .string()
        .optional()
        .describe(JSON.stringify({ s3: true })),
      createdAt: z.date().describe("Read-only field"),
    }),
  ),
)
