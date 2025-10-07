test("GET to /api/v1/status should return 200", async () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/status`);
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  const parseUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
