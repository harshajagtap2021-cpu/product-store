export async function GET() {
  try {
    console.log("API request received");

    const res = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // important for Vercel
    });

    if (!res.ok) {
      throw new Error("External API failed");
    }

    const data = await res.json();

    return Response.json(data);

  } catch (error) {
    console.error("API error:", error);

    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}