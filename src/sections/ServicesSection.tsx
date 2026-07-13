import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Modelagem 3D',
    description:
      'Criação de objetos, personagens ou ambientes detalhados sob medida para as necessidades específicas do cliente, ideais para jogos, produtos e visualizações.',
  },
  {
    number: '02',
    name: 'Renderização',
    description:
      'Renderizações fotorrealistas de alta qualidade que mostram os designs com iluminação, texturas e materiais personalizados para dar vida aos conceitos.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Animações dinâmicas e motion graphics que trazem energia e narrativa para marcas, produtos e experiências digitais.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Criação de identidades visuais coesas -- de logotipos a sistemas de marca completos -- que comunicam uma presença clara e memorável.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Criação de sites limpos, modernos e focados em conversão, com atenção ao layout, tipografia e experiência do usuário.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Serviços
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
              }}
            >
              <span
                className="text-[#0C0C0C] font-black flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col justify-center gap-2 sm:gap-3">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
