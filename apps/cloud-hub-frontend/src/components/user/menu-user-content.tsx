import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { requireAuthenticatedUser } from '@/lib/utils';

export async function MenuUserContent() {
  const user = await requireAuthenticatedUser();

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}
