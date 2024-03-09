import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NoteTaker } from './app';

describe('App', () => {
  it('should render app component', async () => {
    const { baseElement } = render(<NoteTaker />);
    await waitFor(() => baseElement);
    expect(baseElement).toBeTruthy();
  });
});
