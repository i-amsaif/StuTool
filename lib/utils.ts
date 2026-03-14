// Utility functions for StuTool
// This file will hold shared helper functions as the project grows.

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
