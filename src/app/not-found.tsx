import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-secondary">404</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
