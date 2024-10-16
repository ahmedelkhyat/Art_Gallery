export default function page() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
  console.log("as");
  return <div>Orders page</div>;
}
