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
  [key: string]: { _meta: string } | TransformedProperties
}

export const zodMetaParser = (schema: z.ZodTypeAny): TransformedProperties => {
  function transformProperties(
    properties: Record<string, JsonSchemaProperty>,
  ): TransformedProperties {
    const transformed: TransformedProperties = {}
    for (const key in properties) {
      if (properties[key].type === "object" && properties[key].properties) {
        const nestedTransformed = transformProperties(
          properties[key].properties,
        )
        if (properties[key].description) {
          transformed[key] = {
            _meta: properties[key].description,
            ...nestedTransformed,
          }
        } else {
          transformed[key] = nestedTransformed
        }
      } else if (properties[key].description) {
        transformed[key] = { _meta: properties[key].description }
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
