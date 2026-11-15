import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PlanId, TierId } from "@/lib/conclave-content";

export type Attendee = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  tier: TierId;
  qty: number;
  promo: string | null;
  pricePaid: number;
  ticketCode: string;
  checkedIn: boolean;
};

export type ExtraEvent = {
  id: string;
  title: string;
  when: string;
  place: string;
  blurb: string;
};

type ConclaveState = {
  organizerName: string | null;
  plan: PlanId;
  attendees: Attendee[];
  extras: ExtraEvent[];
  enter: (name: string) => void;
  leave: () => void;
  setPlan: (plan: PlanId) => void;
  register: (attendee: Attendee) => void;
  toggleCheck: (id: string) => void;
  addEvent: (event: ExtraEvent) => void;
};

const seed: Attendee[] = [
  {
    id: "a1",
    eventId: "feira",
    name: "Ana Lima",
    email: "ana.lima@correo.test",
    tier: "pista",
    qty: 1,
    promo: null,
    pricePaid: 80,
    ticketCode: "CLV-1842",
    checkedIn: true,
  },
  {
    id: "a2",
    eventId: "feira",
    name: "Bruno Dias",
    email: "bruno.dias@correo.test",
    tier: "camarote",
    qty: 1,
    promo: "LORE20",
    pricePaid: 208,
    ticketCode: "CLV-1904",
    checkedIn: false,
  },
  {
    id: "a3",
    eventId: "feira",
    name: "Caio Mendes",
    email: "caio.mendes@correo.test",
    tier: "mezanino",
    qty: 2,
    promo: "ARCADE10",
    pricePaid: 252,
    ticketCode: "CLV-1911",
    checkedIn: false,
  },
  {
    id: "a4",
    eventId: "iris",
    name: "Duda Ferreira",
    email: "duda.ferreira@correo.test",
    tier: "pista",
    qty: 1,
    promo: null,
    pricePaid: 80,
    ticketCode: "CLV-2033",
    checkedIn: true,
  },
  {
    id: "a5",
    eventId: "dragao",
    name: "Elena Souza",
    email: "elena.souza@correo.test",
    tier: "camarote",
    qty: 1,
    promo: null,
    pricePaid: 260,
    ticketCode: "CLV-2110",
    checkedIn: false,
  },
  {
    id: "a6",
    eventId: "astronomo",
    name: "Felipe Rocha",
    email: "felipe.rocha@correo.test",
    tier: "mezanino",
    qty: 1,
    promo: "FAS15",
    pricePaid: 125,
    ticketCode: "CLV-2208",
    checkedIn: false,
  },
];

const memoryStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useConclave = create<ConclaveState>()(
  persist(
    (set) => ({
      organizerName: null,
      plan: "gratis",
      attendees: seed,
      extras: [],
      enter: (name) => set({ organizerName: name.trim() }),
      leave: () => set({ organizerName: null }),
      setPlan: (plan) => set({ plan }),
      register: (attendee) => set((state) => ({ attendees: [attendee, ...state.attendees] })),
      toggleCheck: (id) =>
        set((state) => ({
          attendees: state.attendees.map((person) =>
            person.id === id ? { ...person, checkedIn: !person.checkedIn } : person,
          ),
        })),
      addEvent: (event) => set((state) => ({ extras: [event, ...state.extras] })),
    }),
    {
      name: "conclave-v1",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : window.localStorage,
      ),
      skipHydration: true,
    },
  ),
);
