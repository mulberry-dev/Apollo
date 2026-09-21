import Container from "@/components/ui/Container"

export default function Loading() {
  return (
    <section aria-busy="true" aria-live="polite" aria-label="Loading project details">
      <Container className="project-page">
        <div className="project-loading">
          <span className="project-loading__spinner" aria-hidden="true" />
          <p>Loading project details…</p>
        </div>
      </Container>
    </section>
  )
}
