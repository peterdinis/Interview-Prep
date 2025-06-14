import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type KindeUser, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import type { FC } from "react";

type ProfileDropdownProps = {
	user: KindeUser;
};

const ProfileDropdown: FC<ProfileDropdownProps> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<AvatarImage src={user?.picture ?? "https://github.com/shadcn.png"} />
					<AvatarFallback>
						{user?.given_name?.[0] ?? "U"}
						{user?.family_name?.[0] ?? ""}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuItem asChild>
					<LogoutLink className="w-full text-left cursor-pointer">
						Logout
					</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
