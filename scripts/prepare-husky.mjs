const shouldSkipHuskySetup =
  process.env.CI || process.env.VERCEL || process.env.NODE_ENV === "production";

if (!shouldSkipHuskySetup) {
  const {default: husky} = await import("husky");
  const result = husky();

  if (result) {
    console.log(result);
  }
}
