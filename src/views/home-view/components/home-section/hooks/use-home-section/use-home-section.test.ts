import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useHomeSection, UseHomeSectionProps } from './use-home-section';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const MOCK_DATA: UseHomeSectionProps = {
  redirect: '/exercise1',
};

const setup = () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  const { result } = renderHook(() => useHomeSection(MOCK_DATA));

  return { result, mockPush };
};

describe('useHomeSection hook', () => {
  it('should return the correct values', () => {
    const { result } = setup();

    expect(result.current).toStrictEqual({
      methods: expect.objectContaining({
        handleRedirect: expect.any(Function),
      }),
    });
  });

  it('should call router.push with the correct redirect URL', () => {
    const { result, mockPush } = setup();

    act(() => {
      result.current.methods.handleRedirect();
    });

    expect(mockPush).toHaveBeenCalledWith(MOCK_DATA.redirect);
  });
});
