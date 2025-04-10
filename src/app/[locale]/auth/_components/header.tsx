import LocaleToggle from "@/components/common/locale-toggle";

export default function Header() {
  return (
    <header className="flex w-[474px] items-center justify-end py-4 mb-24">
      <LocaleToggle />
    </header>
  );
}
