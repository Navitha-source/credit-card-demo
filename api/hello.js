export default async function (context, req) {
  context.res = {
    status: 200,
    body: "Hello from Azure API!"
  }
}
