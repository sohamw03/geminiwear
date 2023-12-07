export default function Product({ params }: { params: { slug: string } }) {
  return <div>My Product: {params.slug}</div>;
}
