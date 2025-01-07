import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

interface JsonSchemaProperty {
  type?: string
  description?: string
  properties?: Record<string, JsonSchemaProperty>
}

interface JsonSchema {
  properties?: Record<string, JsonSchemaProperty>
}

interface TransformedProperties {
  [key: string]: { _meta: any } | TransformedProperties
}

export const zodMetaParser = (schema: z.ZodTypeAny): TransformedProperties => {
  function transformProperties(
    properties: Record<string, JsonSchemaProperty>,
  ): TransformedProperties {
    const transformed: TransformedProperties = {}
    for (const key in properties) {
      const property = properties[key]
      if (property.type === "object" && property.properties) {
        const nestedTransformed = transformProperties(property.properties)
        if (property.description) {
          let parsedDescription
          try {
            parsedDescription = JSON.parse(property.description)
          } catch {
            parsedDescription = property.description
          }
          transformed[key] = {
            _meta: parsedDescription,
            ...nestedTransformed,
          }
        } else {
          transformed[key] = nestedTransformed
        }
      } else if (property.description) {
        let parsedDescription
        try {
          parsedDescription = JSON.parse(property.description)
        } catch {
          parsedDescription = property.description
        }
        transformed[key] = { _meta: parsedDescription }
      }
    }
    return transformed
  }

  const result: TransformedProperties = {}

  const jsonSchema = zodToJsonSchema(schema) as JsonSchema

  if (jsonSchema.properties) {
    Object.assign(result, transformProperties(jsonSchema.properties))
  }

  return result
}
