import { HomeIcon, PizzaIcon, UtensilsCrossedIcon } from "lucide-react"

import { NavLink } from "./nav-link"
import { ThemeToggle } from "./theme/theme-toggle"
import { Separator } from "./ui/separator"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <PizzaIcon className="size-6" />

        <Separator
          orientation="vertical"
          className="h-6"
        />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <HomeIcon className="size-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossedIcon className="size-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
