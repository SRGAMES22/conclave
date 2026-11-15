import { createFileRoute } from "@tanstack/react-router";
import { ConclavePage } from "@/components/conclave-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conclave — eventos geek, filmes, séries e jogos" },
      {
        name: "description",
        content:
          "Páginas de inscrição, ingressos e um lar para encontros geek, com novidades de filmes, séries e jogos.",
      },
    ],
  }),
  component: ConclavePage,
});
