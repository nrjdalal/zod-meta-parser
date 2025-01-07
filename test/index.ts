import { zodMetaParser } from "@/index"
import { z } from "zod"

console.log(
  zodMetaParser(
    z.object({
      any: z.any(), // any has no description
      boolean: z.string().describe("boolean description"),
      object: z
        .object({
          string: z.string().describe("string description"),
        })
        .describe("object description"),
    }),
  ),
)
