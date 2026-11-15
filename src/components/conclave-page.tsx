import { useEffect, useMemo, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";
import {
  brl,
  chronicles,
  events,
  normalizePromo,
  plans,
  promos,
  stories,
  tiers,
  unitPrice,
  type CatalogEvent,
  type NewsKind,
  type PlanId,
  type Story,
  type TierId,
} from "@/lib/conclave-content";
import { useConclave, type ExtraEvent } from "@/lib/conclave-store";

type Filter = "tudo" | NewsKind;
type PickerEvent = {
  id: string;
  title: string;
  when: string;
  place: string;
  blurb: string;
  image?: string;
  position?: string;
};

const filters: { id: Filter; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "filmes", label: "Filmes" },
  { id: "series", label: "Séries" },
  { id: "jogos", label: "Jogos" },
];

function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function ticketCode() {
  const chunk = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CLV-${chunk}`;
}

export function ConclavePage() {
  const [filter, setFilter] = useState<Filter>("tudo");
  const [eventId, setEventId] = useState("feira");
  const [story, setStory] = useState<Story | null>(null);
  const [enterOpen, setEnterOpen] = useState(false);
  const organizerName = useConclave((state) => state.organizerName);

  useEffect(() => {
    void useConclave.persist.rehydrate();
  }, []);

  function goNews(kind: Filter) {
    setFilter(kind);
    scrollToId(kind === "tudo" ? "novidades" : "novidades");
  }

  function chooseEvent(id: string) {
    setEventId(id);
    scrollToId("ao-vivo");
  }

  return (
    <div id="topo">
      <header className="nav-bar">
        <div className="wrap nav">
          <button className="brand" type="button" onClick={() => scrollToId("topo")}>
            <span className="mark" aria-hidden="true">
              <span />
            </span>
            Conclave
          </button>
          <nav className="nav-links" aria-label="Seções">
            <button type="button" onClick={() => scrollToId("topo")}>
              Eventos
            </button>
            <button type="button" onClick={() => goNews("filmes")}>
              Filmes
            </button>
            <button type="button" onClick={() => goNews("series")}>
              Séries
            </button>
            <button type="button" onClick={() => goNews("jogos")}>
              Jogos
            </button>
          </nav>
          <div className="nav-actions">
            <button className="text-btn" type="button" onClick={() => setEnterOpen(true)}>
              {organizerName ? organizerName.split(" ")[0] : "Entrar"}
            </button>
            <button className="btn btn-ink" type="button" onClick={() => scrollToId("organizar")}>
              Criar evento
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero onPlan={() => scrollToId("organizar")} onLive={() => chooseEvent("feira")} onPick={chooseEvent} />
        <News filter={filter} onFilter={setFilter} onOpen={setStory} />
        <Register eventId={eventId} onEvent={setEventId} />
        <Others onPick={chooseEvent} />
        <Organizer />
        <Pricing />
        <Chronicles />
      </main>

      <footer className="wrap footer">
        <span>Conclave · encontros geek, filmes, séries e jogos</span>
        <span>Cartazes com pintura de domínio público.</span>
      </footer>

      <StoryDialog story={story} onClose={() => setStory(null)} />
      <EnterDialog open={enterOpen} onOpen={setEnterOpen} />
    </div>
  );
}

function Hero({
  onPlan,
  onLive,
  onPick,
}: {
  onPlan: () => void;
  onLive: () => void;
  onPick: (id: string) => void;
}) {
  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="kicker">
          <span className="kicker-rule" aria-hidden="true" />
          Para organizadores
        </p>
        <h1 className="hero-title">
          <span>Junte pessoas</span>
          <span>em volta do que</span>
          <span className="hero-em">importa.</span>
        </h1>
        <p className="lede">
          Inscrição, ingressos, lembretes e um lar para cada encontro geek — do clube de dez pessoas à
          convenção de dois mil lugares.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={onPlan}>
            Planejar agora
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button className="btn btn-ghost" type="button" onClick={onLive}>
            Ver ao vivo
          </button>
        </div>
        <div className="metrics">
          <p>
            <strong>12.400</strong>
            <span>eventos realizados</span>
          </p>
          <p>
            <strong>98%</strong>
            <span>voltariam de novo</span>
          </p>
          <p>
            <strong>4 min</strong>
            <span>para publicar a página</span>
          </p>
        </div>
      </div>

      <div className="hero-art">
        <div className="ring" aria-hidden="true" />
        <button className="event-card" type="button" onClick={() => onPick("feira")}>
          <div className="event-art">
            <img
              src="/art/harvest.jpg"
              alt="Colheita de outono em pintura, cartaz da Feira Geek de Outono"
              style={{ objectPosition: "62% 46%" }}
            />
            <span className="date-badge">
              <small>OUT</small>
              <b>14</b>
            </span>
            <span className="gold-pill">Últimas vagas</span>
          </div>
          <div className="event-body">
            <h2>Feira Geek de Outono</h2>
            <p className="event-meta">Sáb, 14 out · 10:00 — Meadow Hall, Recife</p>
            <div className="event-foot">
              <span className="faces" aria-hidden="true">
                <i className="c1" />
                <i className="c2" />
                <i className="c3" />
                <i className="c4" />
              </span>
              <span className="going">+128 vão</span>
            </div>
          </div>
        </button>

        <button className="pass" type="button" onClick={() => onPick("feira")}>
          <span className="pass-stub">
            <small>Fila C</small>
            <b>12</b>
          </span>
          <span className="pass-copy">
            <span className="pass-kicker">Ingresso geral</span>
            <strong>Feira Geek de Outono</strong>
            <span className="pass-meta">Portões 9:30 · Scan no portão B</span>
          </span>
        </button>

        <button className="mini" type="button" onClick={() => onPick("iris")}>
          <span className="mini-art">
            <img
              src="/art/irises.jpg"
              alt="Íris azuis, cartaz do Clube das Íris"
              style={{ objectPosition: "72% 24%" }}
            />
          </span>
          <span className="mini-caption">Clube das Íris</span>
        </button>
      </div>
    </section>
  );
}

function News({
  filter,
  onFilter,
  onOpen,
}: {
  filter: Filter;
  onFilter: (filter: Filter) => void;
  onOpen: (story: Story) => void;
}) {
  const visible = stories.filter((item) => filter === "tudo" || item.kind === filter);

  return (
    <section className="wrap section" id="novidades">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Novidades
          </p>
          <h2>
            Filmes, séries e <em>jogos.</em>
          </h2>
          <p className="section-lead">
            O que estreia na temporada da feira. Nada de grade genérica: cada título tem sessão, mesa ou demo.
          </p>
        </div>
        <div className="chips" role="group" aria-label="Filtrar novidades">
          {filters.map((item) => (
            <button
              key={item.id}
              className="chip"
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => onFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="news-grid">
        {visible.map((item) => (
          <button key={item.id} className="news-card" type="button" onClick={() => onOpen(item)}>
            <img src={item.image} alt="" style={{ objectPosition: item.position }} />
            <span className="news-copy">
              <span className="eyebrow">{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.dek}</p>
              <span className="when">{item.when}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function usePickerEvents(): PickerEvent[] {
  const extras = useConclave((state) => state.extras);
  return useMemo(() => {
    const made: PickerEvent[] = extras.map((event) => ({
      id: event.id,
      title: event.title,
      when: event.when,
      place: event.place,
      blurb: event.blurb,
    }));
    return [...events, ...made];
  }, [extras]);
}

function Register({ eventId, onEvent }: { eventId: string; onEvent: (id: string) => void }) {
  const list = usePickerEvents();
  const current = list.find((item) => item.id === eventId) ?? list[0];
  const register = useConclave((state) => state.register);
  const [tier, setTier] = useState<TierId>("pista");
  const [qty, setQty] = useState(1);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [promoNote, setPromoNote] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ code: string; total: number } | null>(null);

  if (!current) return null;
  const unit = unitPrice(tier, promo);
  const total = unit * qty;

  function applyPromo() {
    const key = normalizePromo(promoInput);
    if (!key) {
      setPromo(null);
      setPromoNote("");
      return;
    }
    if (!promos[key]) {
      setPromo(null);
      setPromoNote("Esse cupom não entrou. Tente ARCADE10, LORE20 ou FAS15.");
      return;
    }
    setPromo(key);
    setPromoNote(promos[key].label);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Diz como a gente te chama.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Precisa de um e-mail válido.");
      return;
    }
    const code = ticketCode();
    register({
      id: code,
      eventId: current.id,
      name: name.trim(),
      email: email.trim(),
      tier,
      qty,
      promo,
      pricePaid: total,
      ticketCode: code,
      checkedIn: false,
    });
    setDone({ code, total });
    setError("");
  }

  return (
    <section className="wrap section" id="ao-vivo">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Inscrição
          </p>
          <h2>
            Garanta o <em>lugar.</em>
          </h2>
        </div>
      </div>
      <div className="split">
        <div>
          <div className="chips" role="group" aria-label="Escolher evento">
            {list.map((item) => (
              <button
                key={item.id}
                className="chip"
                type="button"
                aria-pressed={item.id === current.id}
                onClick={() => {
                  onEvent(item.id);
                  setDone(null);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
          <figure className="poster">
            {current.image ? (
              <img src={current.image} alt="" style={{ objectPosition: current.position }} />
            ) : (
              <div className="poster-fallback" aria-hidden="true">
                {current.title.slice(0, 1)}
              </div>
            )}
            <figcaption>
              <b>{current.title}</b>
              <p className="event-meta">
                {current.when} — {current.place}
              </p>
              <p className="section-lead">{current.blurb}</p>
            </figcaption>
          </figure>
        </div>

        <form className="panel" onSubmit={onSubmit}>
          {done ? (
            <div className="ticket-done">
              <span className="eyebrow">Ingresso confirmado</span>
              <strong>{done.code}</strong>
              <p className="event-meta">
                {current.title} · {qty}× {tiers.find((item) => item.id === tier)?.name} · {brl.format(done.total)}
              </p>
              <p className="ok">A lista do organizador já recebeu seu nome.</p>
              <button className="btn btn-ghost" type="button" onClick={() => setDone(null)}>
                Nova inscrição
              </button>
            </div>
          ) : (
            <>
              <div className="tiers" role="radiogroup" aria-label="Tipo de ingresso">
                {tiers.map((item) => (
                  <button
                    key={item.id}
                    className="tier"
                    type="button"
                    role="radio"
                    aria-checked={tier === item.id}
                    onClick={() => setTier(item.id)}
                  >
                    <span>
                      <b>{item.name}</b>
                      <small>{item.detail}</small>
                    </span>
                    <em>{brl.format(unitPrice(item.id, promo))}</em>
                  </button>
                ))}
              </div>

              <label className="field">
                Cupom
                <span className="promo-row">
                  <input suppressHydrationWarning
                    value={promoInput}
                    onChange={(event) => setPromoInput(event.target.value)}
                    placeholder="ARCADE10"
                    aria-describedby="promo-note"
                    autoCapitalize="characters"
                  />
                  <button className="btn btn-ghost btn-small" type="button" onClick={applyPromo}>
                    Aplicar
                  </button>
                </span>
                <small id="promo-note" className={promoNote.startsWith("Esse") ? "error" : "hint"}>
                  {promoNote || "ARCADE10, LORE20 ou FAS15"}
                </small>
              </label>

              <div className="qty">
                <span>Quantidade</span>
                <button type="button" aria-label="Menos um ingresso" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                  <Minus size={16} />
                </button>
                <output>{qty}</output>
                <button type="button" aria-label="Mais um ingresso" onClick={() => setQty((value) => Math.min(6, value + 1))}>
                  <Plus size={16} />
                </button>
              </div>

              <label className="field">
                Nome
                <input suppressHydrationWarning value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                E-mail
                <input suppressHydrationWarning
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                />
              </label>

              <div className="total-row">
                <span>Total</span>
                <strong>{brl.format(total)}</strong>
              </div>
              {error ? <p className="error">{error}</p> : null}
              <button className="btn btn-primary" type="submit">
                Confirmar inscrição
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Others({ onPick }: { onPick: (id: string) => void }) {
  const extras = useConclave((state) => state.extras);
  const rest = events.filter((item) => item.id !== "feira");

  return (
    <section className="wrap section" id="outros">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Agenda
          </p>
          <h2>
            Outros <em>encontros.</em>
          </h2>
        </div>
      </div>
      <div className="side-grid">
        {rest.map((item) => (
          <EventTile key={item.id} item={item} onPick={onPick} />
        ))}
        {extras.map((item) => (
          <button key={item.id} className="side-card" type="button" onClick={() => onPick(item.id)}>
            <div className="side-fallback" aria-hidden="true">
              {item.title.slice(0, 1)}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.when} — {item.place}
              </p>
              <p>{item.blurb}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function EventTile({ item, onPick }: { item: CatalogEvent; onPick: (id: string) => void }) {
  return (
    <button className="side-card" type="button" onClick={() => onPick(item.id)}>
      <img src={item.image} alt="" style={{ objectPosition: item.position }} />
      <div>
        <h3>{item.title}</h3>
        <p>
          {item.when} — {item.place}
        </p>
        <p>{item.blurb}</p>
      </div>
    </button>
  );
}

function Organizer() {
  const attendees = useConclave((state) => state.attendees);
  const extras = useConclave((state) => state.extras);
  const organizerName = useConclave((state) => state.organizerName);
  const toggleCheck = useConclave((state) => state.toggleCheck);
  const addEvent = useConclave((state) => state.addEvent);
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("todos");
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [place, setPlace] = useState("");
  const [blurb, setBlurb] = useState("");
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState("");

  const names = useMemo(() => {
    const map = new Map<string, string>(events.map((item) => [item.id, item.title]));
    extras.forEach((item) => map.set(item.id, item.title));
    return map;
  }, [extras]);

  const visible = attendees.filter((person) => {
    const hay = `${person.name} ${person.email} ${person.ticketCode}`.toLowerCase();
    const matchesQuery = hay.includes(query.trim().toLowerCase());
    const matchesEvent = eventFilter === "todos" || person.eventId === eventFilter;
    return matchesQuery && matchesEvent;
  });

  const present = attendees.filter((person) => person.checkedIn).length;
  const revenue = attendees.reduce((sum, person) => sum + person.pricePaid, 0);

  function onCreate(event: FormEvent) {
    event.preventDefault();
    if (title.trim().length < 3 || when.trim().length < 3 || place.trim().length < 3) {
      setFormError("Título, quando e lugar precisam estar preenchidos.");
      setSaved("");
      return;
    }
    const made: ExtraEvent = {
      id: `extra-${Date.now().toString(36)}`,
      title: title.trim(),
      when: when.trim(),
      place: place.trim(),
      blurb: blurb.trim() || "Encontro novo na agenda do Conclave.",
    };
    addEvent(made);
    setTitle("");
    setWhen("");
    setPlace("");
    setBlurb("");
    setFormError("");
    setSaved(`${made.title} já aparece na agenda e na inscrição.`);
  }

  return (
    <section className="wrap section" id="organizar">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Organizador
          </p>
          <h2>
            Lista e <em>check-in.</em>
          </h2>
          <p className="section-lead">
            {organizerName
              ? `Mesa de ${organizerName}. A lista fica salva neste navegador.`
              : "A lista fica salva neste navegador. Entrar só põe seu nome na mesa."}
          </p>
        </div>
      </div>

      <div className="stats">
        <p>
          <strong>{attendees.length}</strong>
          <span>inscritos</span>
        </p>
        <p>
          <strong>{present}</strong>
          <span>presentes</span>
        </p>
        <p>
          <strong>{brl.format(revenue)}</strong>
          <span>na lista</span>
        </p>
      </div>

      <div className="roster-top">
        <input suppressHydrationWarning
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar nome, e-mail ou ingresso"
          aria-label="Buscar inscritos"
        />
        <select suppressHydrationWarning aria-label="Filtrar por evento" value={eventFilter} onChange={(event) => setEventFilter(event.target.value)}>
          <option value="todos">Todos os eventos</option>
          {[...events, ...extras].map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="empty">Ninguém com esse filtro nesta lista.</p>
      ) : (
        <ul className="roster">
          {visible.map((person) => (
            <li key={person.id} className="person">
              <span>
                <b>{person.name}</b>
                <small>
                  {names.get(person.eventId) ?? "Evento"} · {person.ticketCode}
                </small>
              </span>
              <small>
                {tiers.find((item) => item.id === person.tier)?.name} · {person.qty} · {brl.format(person.pricePaid)}
              </small>
              <span className={person.checkedIn ? "status on" : "status"}>
                {person.checkedIn ? "Presente" : "A caminho"}
              </span>
              <button className="btn btn-ghost btn-small" type="button" onClick={() => toggleCheck(person.id)}>
                {person.checkedIn ? (
                  "Desfazer"
                ) : (
                  <>
                    <Check size={14} aria-hidden="true" /> Check-in
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="panel gap-top" onSubmit={onCreate}>
        <p className="eyebrow">Novo evento</p>
        <div className="create-grid">
          <label className="field span-2">
            Título
            <input suppressHydrationWarning value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="field">
            Quando
            <input suppressHydrationWarning value={when} onChange={(event) => setWhen(event.target.value)} placeholder="Sáb, 5 dez · 16:00" />
          </label>
          <label className="field">
            Lugar
            <input suppressHydrationWarning value={place} onChange={(event) => setPlace(event.target.value)} placeholder="Sala 2, Recife" />
          </label>
          <label className="field span-2">
            Uma linha
            <input suppressHydrationWarning value={blurb} onChange={(event) => setBlurb(event.target.value)} />
          </label>
        </div>
        {formError ? <p className="error">{formError}</p> : null}
        {saved ? <p className="ok">{saved}</p> : null}
        <button className="btn btn-primary gap-top" type="submit">
          Publicar na agenda
        </button>
      </form>
    </section>
  );
}

function Pricing() {
  const plan = useConclave((state) => state.plan);
  const setPlan = useConclave((state) => state.setPlan);

  return (
    <section className="wrap section" id="precos">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Preços
          </p>
          <h2>
            Quanto custa <em>organizar.</em>
          </h2>
          <p className="section-lead">O ingresso de quem vem é outro caixa. Aqui é o plano de quem publica a página.</p>
        </div>
      </div>
      <div className="plan-grid">
        {plans.map((item) => (
          <button
            key={item.id}
            className="plan"
            type="button"
            aria-pressed={plan === item.id}
            onClick={() => setPlan(item.id as PlanId)}
          >
            <span className="eyebrow">{plan === item.id ? "Plano atual" : "Plano"}</span>
            <h3>{item.name}</h3>
            <p className="price">
              {item.price}
              {item.period ? <span> {item.period}</span> : null}
            </p>
            <p>{item.detail}</p>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </section>
  );
}

function Chronicles() {
  return (
    <section className="wrap section" id="cronicas">
      <div className="section-head">
        <div>
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            Crônicas
          </p>
          <h2>
            Quem já <em>abriu a porta.</em>
          </h2>
        </div>
      </div>
      <div className="quote-grid">
        {chronicles.map((item) => (
          <blockquote className="quote" key={item.name}>
            <p>{item.quote}</p>
            <footer>
              {item.name}
              <span>{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function StoryDialog({ story, onClose }: { story: Story | null; onClose: () => void }) {
  return (
    <Dialog.Root open={story !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal" aria-describedby={undefined}>
          {story ? (
            <>
              <div className="modal-art">
                <img src={story.image} alt="" style={{ objectPosition: story.position }} />
              </div>
              <div className="modal-top">
                <div>
                  <Dialog.Title className="modal-title">{story.title}</Dialog.Title>
                  <p className="eyebrow gap-top">
                    {story.kicker} · {story.when}
                  </p>
                </div>
                <Dialog.Close className="icon-x" aria-label="Fechar">
                  <X size={16} />
                </Dialog.Close>
              </div>
              {story.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="section-lead">
                  {paragraph}
                </p>
              ))}
              <button className="btn btn-primary gap-top" type="button" onClick={() => { onClose(); scrollToId("ao-vivo"); }}>
                Quero ir
              </button>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function EnterDialog({ open, onOpen }: { open: boolean; onOpen: (open: boolean) => void }) {
  const organizerName = useConclave((state) => state.organizerName);
  const enter = useConclave((state) => state.enter);
  const leave = useConclave((state) => state.leave);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Um nome já basta.");
      return;
    }
    enter(name.trim());
    setName("");
    setError("");
    onOpen(false);
    scrollToId("organizar");
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal">
          <div className="modal-top">
            <Dialog.Title className="modal-title">
              {organizerName ? `Mesa de ${organizerName}` : "Entrar na mesa"}
            </Dialog.Title>
            <Dialog.Close className="icon-x" aria-label="Fechar">
              <X size={16} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="section-lead">
            Sem conta nova. O nome fica só neste navegador, na lista de quem organiza.
          </Dialog.Description>
          {organizerName ? (
            <button
              className="btn btn-ghost gap-top"
              type="button"
              onClick={() => {
                leave();
                onOpen(false);
              }}
            >
              Sair da mesa
            </button>
          ) : (
            <form onSubmit={onSubmit}>
              <label className="field">
                Seu nome
                <input suppressHydrationWarning value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </label>
              {error ? <p className="error">{error}</p> : null}
              <button className="btn btn-primary gap-top" type="submit">
                Entrar
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
