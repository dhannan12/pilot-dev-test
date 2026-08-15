/// <reference types="vitest" />
import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    interface Matchers<R = any> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
    }
  }
}
