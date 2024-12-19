import { z } from "zod"
import { UserRole } from "./user.constant"

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string!",
      required_error: "Name is required",
    }),
    email: z
      .string({
        invalid_type_error: "Email must be string!",
        required_error: "Email is required",
      })
      .trim()
      .toLowerCase(),
    password: z.string().min(8).max(16),
  }),
})

export const UserValidationSchema = {
  createUserValidationSchema,
}
