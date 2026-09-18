import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { icons } from "@/assets/icons/icons";
import { images } from "@/assets/images/images";
import Button from "@/components/Button";
import { NAV_LINKS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useScrolled } from "@/hooks/useScrolled";
import LanguageSwitcher from "@/layouts/Header/LanguageSwitcher";
import MobileMenu from "@/layouts/Header/MobileMenu";
import NavDropdown from "@/layouts/Header/NavDropdown";
import { isBranchActive } from "@/utils/nav";

export default function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const [openNav, setOpenNav] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-hair-8 bg-white/[0.82] backdrop-blur-[14px] backdrop-saturate-[1.8] transition-shadow duration-300 ${
          scrolled ? "shadow-header" : ""
        }`}>
        <div className="mx-auto flex h-[68px] max-w-container justify-between items-center gap-7 px-4 to-1320:gap-4 to-420:gap-2 to-320:px-3">
          <Link
            to={ROUTES.HOME}
            className="flex min-w-0 flex-none items-center gap-[11px] text-ink to-420:gap-2">
            <img
              src={images.coatOfArms}
              alt={t("site.coatOfArms")}
              className="block h-[42px] w-[38px] flex-none object-contain to-420:h-[36px] to-420:w-[33px]"
            />
            <span className="flex flex-col leading-[1.25] to-540:hidden">
              <span className="text-[10.5px] font-semibold tracking-[0.04em] text-ink-550">
                {t("site.republic")}
              </span>
              <span className="text-[10.5px] font-semibold tracking-[0.04em] text-ink-550">
                {t("site.ministry")}
              </span>
            </span>
          </Link>

          <ul className="m-0 flex flex-1 list-none items-center justify-center gap-[6px] p-0 to-1320:gap-0 to-1180:hidden">
            {NAV_LINKS.map((link, index) => {
              const active = isBranchActive(link, pathname);

              return (
                <li
                  key={link.labelKey}
                  className="relative m-0 list-none p-0"
                  onMouseEnter={() => setOpenNav(index)}
                  onMouseLeave={() => setOpenNav(null)}>
                  <Link
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-[5px] whitespace-nowrap px-3 py-[22px] text-[14.5px] font-medium transition-colors duration-[180ms] hover:text-brand to-1320:px-2 to-1320:text-[13.5px] ${
                      active ? "text-brand" : "text-ink-700"
                    }`}>
                    {t(link.labelKey)}
                    {link.children.length > 0 && (
                      <icons.chevronDown size={12} className="opacity-55" />
                    )}
                  </Link>

                  {openNav === index && link.children.length > 0 && (
                    <NavDropdown items={link.children} onNavigate={closeMenu} />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-none items-center gap-4 to-480:gap-[10px] to-360:gap-2">
            <LanguageSwitcher />

            <Button
              to={ROUTES.LOGIN}
              variant="dark"
              size="xs"
              aria-label={t("site.myCulture")}
              className="shadow-btn to-420:gap-0 to-420:px-[11px]">
              <icons.user size={15} className="flex-none" />
              <span className="to-420:hidden">{t("site.myCulture")}</span>
            </Button>

            <button
              ref={burgerRef}
              type="button"
              aria-label={t("common.menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="hidden h-10 w-10 items-center justify-center rounded-[9px] border border-hair-16 bg-white p-0 text-ink to-1180:!inline-flex">
              <icons.menuToggle open={menuOpen} size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={burgerRef} />
    </>
  );
}
