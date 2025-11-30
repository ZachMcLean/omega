import { NextRequest } from "next/server";
import { z } from "zod";

type ZodSchema<T> = z.ZodType<T>;
type ZodError = z.ZodError;

/**
 * Parse and validate query parameters from Next.js request
 */
export function parseQueryParams<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const url = new URL(req.url);
  const params: Record<string, string | null> = {};
  
  // Convert URLSearchParams to object
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const result = schema.safeParse(params);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, error: result.error };
}

/**
 * Parse and validate request body
 */
export async function parseRequestBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: z.ZodError }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    return { success: false, error: result.error };
  } catch (error) {
    return {
      success: false,
      error: new z.ZodError([{
        code: "custom",
        path: [],
        message: "Invalid JSON",
      }]),
    };
  }
}

/**
 * Create error response from Zod error
 */
export function zodErrorResponse(error: z.ZodError) {
  return {
    error: "Validation failed",
    details: error.issues.map((err: z.ZodIssue) => ({
      path: err.path.join("."),
      message: err.message,
    })),
  };
}

