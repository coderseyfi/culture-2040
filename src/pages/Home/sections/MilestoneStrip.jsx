import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import GridPattern from '@/components/GridPattern';
import { MILESTONES } from '@/constants/home';
import { useCountUpYears } from '@/hooks/useCountUpYears';

const TARGETS = MILESTONES.map((milestone) => milestone.year);

export default function MilestoneStrip() {
  const { t } = useTranslation();
  const [ref, years, started] = useCountUpYears(TARGETS);

  return (
    <section
      ref={ref}
      id="milestone-strip"
      className="relative overflow-hidden border-y border-hair-8 bg-white"
    >
      <GridPattern variant="strip" />

      <div className="relative mx-auto max-w-container px-4 pb-[68px] pt-16 to-640:pb-10 to-640:pt-10 to-320:px-3">
        <div className="relative grid grid-cols-3 gap-6 to-720:grid-cols-1 to-720:gap-9">
          <div className="absolute left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] top-[15px] h-[2px] rounded-full bg-hair-10 to-720:hidden" />
          <div
            className="absolute left-[calc(16.67%+8px)] top-[15px] h-[2px] w-[calc(66.67%-16px)] origin-left rounded-full bg-[linear-gradient(90deg,#0E6E6E,#146C94,#1F7A5C)] transition-transform duration-[1600ms] ease-line to-720:hidden"
            style={{ transform: `scaleX(${started ? 1 : 0})` }}
          />

          {MILESTONES.map((milestone, index) => {
            const Icon = icons[milestone.icon];
            return (
              <div key={milestone.year} className="reveal relative px-3 text-center">
                <span
                  className="relative z-[1] mb-6 inline-flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: milestone.tint }}
                >
                  <Icon size={22} color={milestone.color} />
                </span>
                <div
                  className="mb-[10px] text-[12px] font-bold tracking-[0.08em]"
                  style={{ color: milestone.color }}
                >
                  {t(milestone.phaseKey)}
                </div>
                <div
                  className="mb-4 text-[56px] font-bold leading-none tracking-[-0.02em] tabular-nums to-900:text-[48px] to-540:text-[40px]"
                  style={{ color: milestone.color }}
                >
                  {years[index]}
                </div>
                <div className="mx-auto max-w-[230px] text-[14.5px] leading-[1.6] text-ink-600">
                  {t(milestone.labelKey)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
