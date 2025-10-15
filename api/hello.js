export async function onRequest(context) {
  return new Response(
    JSON.stringify({ message: "Hello from Azure Static Web Apps API!" }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
