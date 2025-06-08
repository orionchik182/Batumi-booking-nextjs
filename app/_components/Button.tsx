import { ButtonType } from "@/@types/next-auth";


export function Button({
  filter,
  handleFilter,
  activeFilter,
  children,
}: ButtonType) {
  return (
    <button
      className={`hover:bg-primary-700 px-5 py-2 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
