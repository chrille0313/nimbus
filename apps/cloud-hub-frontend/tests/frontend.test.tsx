import { expect, test, describe, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CloudCard } from '@/components/cards/cloud-card';
import { CreateCloudForm } from '@/components/forms/create-cloud-form';
import { CardGrid } from '@/components/containers/card-grid';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { ConfirmationButtons } from '@/components/forms/confirmation-buttons';
import { SearchForm } from '@/components/search-form';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  }),
  usePathname: () => '/'
}));

describe('Breadcrumbs', () => {
  beforeAll(() => {
    render(<Breadcrumbs path="/clouds/MyCloud/file" />);
  });

  test('renders breadcrumb texts correctly', () => {
    expect(screen.getByText('clouds')).toBeDefined();
    expect(screen.getByText('MyCloud')).toBeDefined();
    expect(screen.getByText('file')).toBeDefined();
  });

  test('renders breadcrumb links correctly', () => {
    const homeLink = screen.getByRole('link', { name: 'clouds' });
    expect(homeLink.getAttribute('href')).toEqual('/clouds');

    const cloudLink = screen.getByRole('link', { name: 'MyCloud' });
    expect(cloudLink.getAttribute('href')).toEqual('/clouds/MyCloud');

    const fileLink = screen.getByRole('link', { name: 'file' });
    expect(fileLink.hasAttribute('href')).toBeFalsy();
  });

  test('renders breadcrumb separators correctly', () => {
    expect(document.querySelectorAll('svg').length).toBe(2);
  });
});

describe('CloudCards', () => {
  test('renders correctly', () => {
    render(<CloudCard id={'1'} name={'CloudCardName'} usedStorage={4} allocatedStorage={5} />);
    const elementLink = screen.getByRole('link', { name: /CloudCardName/i });
    const elementName = screen.getByText('CloudCardName');
    const elementStorage = screen.getByText('4 B / 5 B');
    expect(elementLink.getAttribute('href')).toEqual('/clouds/1');
    expect(elementName).toBeDefined();
    expect(elementStorage).toBeDefined();
  });
});

describe('CardGrid', () => {
  test('renders multiple children correctly', () => {
    render(
      <CardGrid>
        <CloudCard id={'1'} name={'CloudCardName1'} usedStorage={1} allocatedStorage={1} />
        <CloudCard id={'2'} name={'CloudCardName2'} usedStorage={2} allocatedStorage={2} />
        <CloudCard id={'3'} name={'CloudCardName3'} usedStorage={3} allocatedStorage={3} />
      </CardGrid>
    );
    expect(screen.getByText('CloudCardName1')).toBeDefined();
    expect(screen.getByText('CloudCardName2')).toBeDefined();
    expect(screen.getByText('CloudCardName3')).toBeDefined();
  });
});

describe('CreateCloudForm', () => {
  test('renders correctly', () => {
    render(<CreateCloudForm />);
    expect(screen.getByText(/Create New Cloud/i)).toBeDefined();
    expect(screen.getByLabelText(/Allocated Storage/i)).toBeDefined();
    expect(screen.getByLabelText(/Unit/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Create/i })).toBeDefined();
  });
});

describe('ConfirmationButtons', () => {
  test('renders correctly', () => {
    render(
      <ConfirmationButtons
        confirm={() => {}}
        confirmText={'TestConfirm'}
        onCancel={() => {}}
        cancelText={'TestCancel'}
      />
    );
    expect(screen.getByText('TestConfirm')).toBeDefined();
    expect(screen.getByText('TestCancel')).toBeDefined();
  });
});

describe('Searchform', () => {
  test('renders correctly for empty input', () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText('Search...')).toBeDefined();
  });

  test('renders correctly for supplied input', () => {
    render(<SearchForm label={'SearchTest'} />);
    expect(screen.getByPlaceholderText('SearchTest')).toBeDefined();
  });
});
