import { renderHook, act } from '@testing-library/react';
import { useRangeSlider } from './use-range-slider';
import { DEFAULT_DATA } from '@/views/exercise1-view/constants';
import { DEFAULT_RANGE } from '@/views/exercise2-view/constants';

const setup = () => {
  const { result } = renderHook(() => useRangeSlider(DEFAULT_DATA));

  return { result };
};

describe('useRangeSlider hook', () => {
  describe('handleChangeValue', () => {
    it('should set defaultMin and defaultMax correctly when range provided', () => {
      const { result } = renderHook(() => useRangeSlider({ range: DEFAULT_RANGE }));

      expect(result.current.state.defaultMin).toBe(DEFAULT_RANGE[0]);
      expect(result.current.state.defaultMax).toBe(DEFAULT_RANGE[DEFAULT_RANGE.length - 1]);
    });

    it('should set defaultMin and defaultMax correctly when min, max provided', () => {
      const { result } = setup();

      expect(result.current.state.defaultMin).toBe(DEFAULT_DATA.min);
      expect(result.current.state.defaultMax).toBe(DEFAULT_DATA.max);
    });

    it('should set value1 correctly when index is 1', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 1, value: 30 });
      });

      expect(result.current.state.value1).toBe(30);
    });

    it('should set value2 correctly when index is 2', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 2, value: 70 });
      });

      expect(result.current.state.value2).toBe(70);
    });

    it('should not set value1 below defaultMin', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 1, value: -10 });
      });

      expect(result.current.state.value1).toBe(0);
    });

    it('should not set value2 above defaultMax', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 2, value: 110 });
      });

      expect(result.current.state.value2).toBe(100);
    });

    it('should not set value1 greater than value2', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 2, value: 50 });
      });

      act(() => {
        result.current.methods.handleChangeValue({ index: 1, value: 80 });
      });

      expect(result.current.state.value1).toBe(50);
    });

    it('should not set value2 less than value1', () => {
      const { result } = setup();

      act(() => {
        result.current.methods.handleChangeValue({ index: 1, value: 50 });
      });

      act(() => {
        result.current.methods.handleChangeValue({ index: 2, value: 20 });
      });

      expect(result.current.state.value2).toBe(50);
    });
  });

  describe('handleMove', () => {
    it('should update value on move', () => {
      const { result } = setup();

      const event = {
        clientX: 50,
        target: {
          getBoundingClientRect: () => ({
            left: 0,
            width: 100,
          }),
        },
      } as unknown as MouseEvent;

      result.current.state.sliderRef.current = {
        getBoundingClientRect: () =>
          ({
            left: 0,
            width: 100,
          }) as DOMRect,
      } as HTMLDivElement;

      act(() => {
        result.current.methods.handleMove(1, event);
      });

      expect(result.current.state.value1).toBe(50);
    });
  });

  describe('handleMouseDown', () => {
    it('should set isDragging and exec event listeners', () => {
      const { result } = setup();

      const event = {
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent;

      act(() => {
        result.current.methods.handleMouseDown({ e: event, index: 1 });
      });

      expect(result.current.state.isDragging).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();

      act(() => {
        document.dispatchEvent(new MouseEvent('mouseup'));
      });

      expect(result.current.state.isDragging).toBe(false);
    });
  });
});
