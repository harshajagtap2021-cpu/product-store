export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 }, 
    });
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}