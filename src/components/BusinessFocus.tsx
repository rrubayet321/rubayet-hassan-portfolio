import { Reveal } from "@/components/Reveal";

const capabilities = [
  {
    name: "Software that works.",
    description: "From the first idea to the details that keep it running.",
    path: "M8 9h16v14H8zM5 26h22M12 14l-3 3 3 3m8-6 3 3-3 3",
  },
  {
    name: "AI with a purpose.",
    description: "Turn repetitive work into room for better decisions.",
    path: "M16 5l3 8 8 3-8 3-3 8-3-8-8-3 8-3z",
  },
  {
    name: "Built for business.",
    description: "Less friction for customers. More opportunities to grow.",
    path: "M5 26h22M8 22v-5m8 5V12m8 10V6M7 12l7-6 5 2 6-5",
  },
];
export function BusinessFocus() {
  return (
    <section className="business-focus" aria-label="What I build for">
      {capabilities.map((item, index) => (
        <Reveal key={item.name} delay={index * 0.07}>
          <div className="capability">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path pathLength="1" d={item.path} />
            </svg>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
