'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import React from 'react';

export function CurrentPathBreadcrumb() {
  const path = usePathname();

  return <Breadcrumbs path={path} />;
}
