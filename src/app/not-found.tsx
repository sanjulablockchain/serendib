import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="m-0 font-display text-[14px] tracking-[0.2em] text-gold-bright">404</p>
      <h1 className="mt-3 text-[clamp(32px,4vw,48px)] font-medium">Page not found</h1>
      <p className="mt-4 text-[20px] text-soft">The page you are looking for does not exist.</p>
      <Button href="/" className="mt-8">
        BACK TO HOME
      </Button>
    </Container>
  );
}
