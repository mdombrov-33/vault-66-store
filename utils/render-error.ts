//* Helper function to format and log errors.
//* Returns a user-friendly error message for UI display.
export const renderError = (error: unknown): { message: string } => {
  console.log('Error:', error)
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred.',
  }
}
