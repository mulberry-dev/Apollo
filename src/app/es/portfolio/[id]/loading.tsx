import Container from "@/components/ui/Container"

export default function Loading() {
  return (
    <section aria-busy="true" aria-live="polite" aria-label="Cargando detalles del proyecto">
      <Container className="project-page">
        <div className="project-loading">
          <span className="project-loading__spinner" aria-hidden="true" />
          <p>Cargando detalles del proyecto…</p>
        </div>
      </Container>
    </section>
  )
}
