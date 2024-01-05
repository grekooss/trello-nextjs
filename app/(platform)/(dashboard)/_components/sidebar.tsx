'use client';

import { useLocalStorage } from 'usehooks-ts';

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoded: isLoadedOrg } =
    useOrganization();
  return <div>sidebar</div>;
};

export default Sidebar;
