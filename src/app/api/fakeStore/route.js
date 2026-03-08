export async function GET() {
  try {
    console.log("req got")
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 }, 
    });
    const data = await res.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}