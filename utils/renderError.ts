//*
export const renderError = (error: unknown): { message: string } => {
  console.log("Error:", error);
  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred.",
  };
};
