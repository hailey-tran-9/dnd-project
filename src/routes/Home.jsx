export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Login prompt and application description will be here.</p>
    </>
  );
}

export async function clientLoader() {
  return {
    title: "Home Page",
  };
}
