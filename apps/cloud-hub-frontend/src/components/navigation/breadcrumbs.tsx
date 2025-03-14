import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@repo/ui/components/breadcrumb';
import React from 'react';
import Link from 'next/link';

export interface BreadcrumbsProps {
  path: string;
}

export function Breadcrumbs({ path }: BreadcrumbsProps) {
  const pathSegments = path.split('/').filter(Boolean); // Remove empty strings

  const crumbs = pathSegments.map((segment, index) => ({
    segment,
    href: `/${pathSegments.slice(0, index + 1).join('/')}`,
    hasSeparator: index !== pathSegments.length - 1,
    isLast: index === pathSegments.length - 1
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb) => (
          <React.Fragment key={crumb.segment}>
            <BreadcrumbItem className="hidden md:block capitalize">
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.segment}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {crumb.hasSeparator && <BreadcrumbSeparator className="hidden md:block" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
