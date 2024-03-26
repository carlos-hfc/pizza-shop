import { useQuery } from "@tanstack/react-query"
import { BuildingIcon, ChevronDownIcon, LogOutIcon } from "lucide-react"

import { getManagedRestaurant } from "@/api/get-managed-restaurant"
import { getProfile } from "@/api/get-profile"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  })

  const { data: managedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {managedRestaurant?.name}
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuLabel className="flex flex-col">
          <span>{profile?.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {profile?.email}
          </span>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <BuildingIcon className="mr-2 size-4" />
            <span>Perfil da loja</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOutIcon className="mr-2 size-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
