import { ClassTransformOptions } from "class-transformer"

export const defaultInstanceOptions: ClassTransformOptions = {
  excludeExtraneousValues: true,
}

export const getDefaultInstanceOptions = (
  options: ClassTransformOptions,
): ClassTransformOptions => ({
  ...defaultInstanceOptions,
  ...options,
})
